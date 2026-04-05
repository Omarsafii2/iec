import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { fetchWebformElements, submitWebform, submitWebformWithFile } from '../../services/api/contactUsApi';
import Loader from '../Loader';
import { getPartnerFieldSpan, getPartnerIcon, partnerFieldUsesIcon } from './webformPartnerUi';
import { canonicalPartnerKeyForSort } from './partnershipFormConfig';
import './DrupalWebform.css';

/** Types we render and submit (after normalizeWebformType). */
const INPUT_TYPES = [
    'textfield',
    'email',
    'tel',
    'textarea',
    'file',
    'webform_document_file',
    'select',
    'webform_select',
    'checkboxes',
    'radios',
    'url',
    'number',
    'date',
    'datetime',
    'hidden',
];
const SKIP_TYPES = [
    'actions',
    'webform_actions',
    'submit',
    'button',
    'captcha',
    'captcha_element',
    'webform_markup',
    'markup',
    'label',
    'processed_text',
    'webform_horizontal_rule',
    'horizontal_rule',
];

/** Containers: recurse into non-# keys for nested fields (fieldsets, flexbox, etc.). */
const CONTAINER_TYPES = new Set([
    'fieldset',
    'container',
    'details',
    'flexbox',
    'webform_flexbox',
    'webform_section',
    'field_group',
    'item',
]);

const normalizeWebformType = (el) => {
    const t = el['#type'];
    const map = {
        webform_select: 'select',
        webform_email: 'email',
        webform_telephone: 'tel',
        telephone: 'tel',
        managed_file: 'file',
        webform_image_file: 'file',
        webform_audio_file: 'file',
        webform_video_file: 'file',
        webform_document_file: 'file',
        integer: 'number',
        numeric: 'number',
        float: 'number',
        webform_number: 'number',
        webform_date: 'date',
        datetime: 'datetime',
        webform_datetime: 'datetime',
    };
    return map[t] || t;
};

/** Some Drupal versions wrap the payload. */
const unwrapElementsPayload = (raw) => {
    if (!raw || typeof raw !== 'object') return {};
    if (raw.elements && typeof raw.elements === 'object' && !raw.elements['#type']) {
        return raw.elements;
    }
    return raw;
};

/**
 * Flatten nested fieldsets / flexbox so fields inside them are not dropped.
 */
const collectLeafElements = (obj, acc = []) => {
    if (!obj || typeof obj !== 'object') return acc;
    for (const [key, el] of Object.entries(obj)) {
        if (!el || typeof el !== 'object') continue;
        const rawType = el['#type'];
        if (!rawType) continue;

        if (CONTAINER_TYPES.has(rawType) || rawType === 'fieldset') {
            for (const [k, v] of Object.entries(el)) {
                if (k.startsWith('#') || k.startsWith('__')) continue;
                if (v && typeof v === 'object' && v['#type']) {
                    collectLeafElements({ [k]: v }, acc);
                }
            }
            continue;
        }

        if (SKIP_TYPES.includes(rawType)) continue;

        let type = normalizeWebformType(el);
        if (!INPUT_TYPES.includes(type)) {
            type = 'textfield';
        }

        if (el['#webform_element'] === false) continue;
        if (el['#access'] === false) continue;

        const webformKey = el['#webform_key'] ?? key;
        acc.push([webformKey, el, type]);
    }
    return acc;
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizeOptions = (el) => {
    const raw = el['#options'];
    if (!raw || typeof raw !== 'object') return [];
    return Object.entries(raw).map(([value, label]) => ({
        value,
        label: label != null ? String(label) : '',
    }));
};

const buildRenderList = (elements) => {
    if (!elements || typeof elements !== 'object') return [];

    const root = unwrapElementsPayload(elements);
    const collected = collectLeafElements(root);
    const byKey = new Map();
    for (const [k, el, type] of collected) {
        byKey.set(k, { key: k, el, type });
    }

    const list = [...byKey.values()].map(({ key, el, type }) => {
        const t = type;
        const options =
            t === 'select' || t === 'radios' || t === 'checkboxes' ? normalizeOptions(el) : [];
        return {
            key,
            type: t,
            title: el['#title'] ?? '',
            placeholder: el['#placeholder'] ?? '',
            required: Boolean(el['#required']),
            requiredError: el['#required_error'] ?? '',
            options,
            defaultValue: el['#default_value'],
            fileAccept: el['#file_extensions']
                ? el['#file_extensions']
                      .split(/[\s,]+/)
                      .map((e) => `.${e.trim()}`)
                      .filter((e) => e !== '.')
                      .join(',')
                : '.pdf,.doc,.docx',
            weight: el['#weight'] ?? 0,
        };
    });
    list.sort((a, b) => a.weight - b.weight);
    return list;
};

const getInitialValue = (type, defaultValue) => {
    if (type === 'file' || type === 'webform_document_file') {
        return null;
    }
    if (type === 'checkboxes') {
        if (Array.isArray(defaultValue)) {
            return defaultValue.filter((v) => v !== null && v !== undefined).map((v) => String(v));
        }
        if (defaultValue && typeof defaultValue === 'object') {
            return Object.entries(defaultValue)
                .filter(([, v]) => Boolean(v))
                .map(([k]) => String(k));
        }
        return [];
    }
    if (defaultValue !== undefined && defaultValue !== null) {
        return String(defaultValue);
    }
    return '';
};

const getInitialFormData = (renderList) => {
    const data = {};
    renderList.forEach(({ key, type, defaultValue }) => {
        data[key] = getInitialValue(type, defaultValue);
    });
    return data;
};

/**
 * Payload for webform_rest/submit.
 * - submitKeyOverrides: map element key → key Drupal expects in `data` (e.g. email → email_address).
 * - checkboxes: associative object { option_key: option_key, ... } (webform_rest JSON).
 * - empty optional fields: omit keys where Drupal rejects "" (e.g. url, select _none_).
 */
const buildSubmitPayload = (elements, formData, submitKeyOverrides = {}) => {
    const out = {};
    elements.forEach(({ key, type, required }) => {
        const outKey = submitKeyOverrides[key] ?? key;
        const val = formData[key] ?? formData[outKey];

        if (type === 'file' || type === 'webform_document_file') {
            return;
        }
        if (type === 'hidden') {
            out[outKey] = val !== undefined && val !== null ? val : '';
            return;
        }
        if (type === 'checkboxes') {
            const arr = Array.isArray(val) ? val.filter((v) => v != null && v !== '') : [];
            if (arr.length === 0) {
                if (!required) return;
                out[outKey] = [];
                return;
            }
            out[outKey] = arr;
            return;
        }
        if (type === 'select') {
            const s = (val ?? '').toString().trim();
            if (s === '' || s === '_none_') return;
            out[outKey] = s;
            return;
        }
        if (val === undefined || val === null) {
            return;
        }
        if (typeof val === 'string') {
            const trimmed = val.trim();
            if (trimmed === '' && !required) {
                return;
            }
            if (type === 'url' && trimmed === '') {
                return;
            }
            out[outKey] = val;
            return;
        }
        out[outKey] = val;
    });
    return out;
};

/** Stable display order when `fieldOrder` is provided (e.g. partnership form mockup). */
const sortElementsByFieldOrder = (elements, fieldOrder) => {
    if (!fieldOrder?.length) return elements;
    const index = new Map(fieldOrder.map((key, i) => [key, i]));
    const sortRank = (elKey) => {
        const c = canonicalPartnerKeyForSort(elKey);
        if (index.has(c)) return index.get(c);
        if (index.has(elKey)) return index.get(elKey);
        return Number.MAX_SAFE_INTEGER;
    };
    return [...elements].sort((a, b) => {
        const ia = sortRank(a.key);
        const ib = sortRank(b.key);
        if (ia !== ib) return ia - ib;
        return (a.weight ?? 0) - (b.weight ?? 0);
    });
};

/** Group adjacent elements into rows when their keys match a pair in fieldRows. */
const buildChunks = (elements, fieldRows) => {
    const norm = (k) => canonicalPartnerKeyForSort(k);
    const pairSet = new Set((fieldRows || []).map(([a, b]) => `${norm(a)}|${norm(b)}`));
    const chunks = [];
    let i = 0;
    while (i < elements.length) {
        const el = elements[i];
        const next = elements[i + 1];
        if (next && pairSet.has(`${norm(el.key)}|${norm(next.key)}`)) {
            chunks.push({ kind: 'row', rows: [el, next] });
            i += 2;
        } else {
            chunks.push({ kind: 'field', el });
            i += 1;
        }
    }
    return chunks;
};

const DrupalWebform = ({
    webformId = 'contact_us',
    baseUrl,
    submitLabel = 'إرسال',
    onSubmitSuccess,
    onSubmitError,
    variant = 'default',
    fieldRows,
    secondaryButtonLabel,
    onSecondaryAction,
    messages: messagesProp,
    formClassName,
    /** Optional explicit element key order (display only; submit uses all keys). */
    fieldOrder,
    /** Optional map { elementKey: drupalDataKey } for POST body `data` (partnership email → email_address). */
    submitKeyOverrides,
    /** Optional array/Set of field keys to hide from rendering (still submitted if in extraSubmitData). */
    excludeFields,
    /** Optional object of extra key-value pairs merged into the submit payload. */
    extraSubmitData,
}) => {
    const messages = useMemo(
        () => ({
            loadError: 'فشل تحميل النموذج',
            empty: 'لا توجد حقول للنموذج.',
            successTitle: 'تم الإرسال بنجاح',
            successText: 'تم إرسال رسالتك بنجاح. سنقوم بالرد في أقرب وقت.',
            submitErrorTitle: 'فشل الإرسال',
            submitErrorGeneric: 'حدث خطأ أثناء الإرسال',
            submitting: 'جاري الإرسال...',
            ok: 'حسناً',
            requiredField: (title) => `${title} مطلوب`,
            invalidEmail: 'البريد الإلكتروني غير صالح',
            invalidUrl: 'Invalid URL',
            fileRequired: (title) => `${title} مطلوب`,
            ...messagesProp,
        }),
        [messagesProp]
    );

    const [elements, setElements] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const excludeSet = useMemo(
        () => (excludeFields ? new Set(excludeFields) : null),
        [excludeFields]
    );

    const displayElements = useMemo(() => {
        let visible = elements.filter((el) => el.type !== 'hidden');
        if (excludeSet) {
            visible = visible.filter((el) => !excludeSet.has(el.key));
        }
        return sortElementsByFieldOrder(visible, fieldOrder);
    }, [elements, fieldOrder, excludeSet]);

    const chunks = useMemo(
        () => buildChunks(displayElements, fieldRows),
        [displayElements, fieldRows]
    );

    const isFirstLastRow =
        displayElements.length >= 2 &&
        displayElements[0].key === 'first_name' &&
        displayElements[1].key === 'last_name' &&
        (!fieldRows || fieldRows.length === 0);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const raw = await fetchWebformElements(webformId, baseUrl);
                const list = buildRenderList(raw);
                setElements(list);
                setFormData(getInitialFormData(list));
            } catch (err) {
                setLoadError(err.message || messages.loadError);
                Swal.fire({
                    icon: 'error',
                    title: messages.submitErrorTitle,
                    text: err.message || messages.loadError,
                    confirmButtonText: messages.ok,
                    customClass: { popup: variant === 'partner' ? '' : 'swal-rtl' },
                });
            } finally {
                setLoading(false);
            }
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only reload when webform or backend URL changes
    }, [webformId, baseUrl]);

    const validate = () => {
        const nextErrors = {};
        const req = (title, custom) => custom || messages.requiredField(title);
        elements.forEach(({ key, title, required, requiredError, type }) => {
            if (excludeSet?.has(key)) {
                return;
            }
            if (type === 'hidden') {
                return;
            }
            if (type === 'file' || type === 'webform_document_file') {
                if (required && !(formData[key] instanceof File)) {
                    nextErrors[key] = requiredError || messages.fileRequired(title);
                }
                return;
            }
            if (type === 'checkboxes') {
                const arr = formData[key];
                const ok = Array.isArray(arr) && arr.length > 0;
                if (required && !ok) {
                    nextErrors[key] = req(title, requiredError);
                }
                return;
            }
            const value = (formData[key] ?? '').toString().trim();
            if (required && !value) {
                nextErrors[key] = req(title, requiredError);
                return;
            }
            if (type === 'email' && value && !isValidEmail(value)) {
                nextErrors[key] = requiredError || messages.invalidEmail;
            }
            if (type === 'url' && value) {
                try {
                    // eslint-disable-next-line no-new
                    new URL(value);
                } catch {
                    nextErrors[key] = requiredError || messages.invalidUrl;
                }
            }
        });
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const toggleCheckbox = (fieldKey, optionValue, checked) => {
        setFormData((prev) => {
            const cur = Array.isArray(prev[fieldKey]) ? [...prev[fieldKey]] : [];
            if (checked) {
                if (!cur.includes(optionValue)) cur.push(optionValue);
            } else {
                const idx = cur.indexOf(optionValue);
                if (idx >= 0) cur.splice(idx, 1);
            }
            return { ...prev, [fieldKey]: cur };
        });
        if (errors[fieldKey]) {
            setErrors((prev) => ({ ...prev, [fieldKey]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...buildSubmitPayload(elements, formData, submitKeyOverrides),
                ...extraSubmitData,
            };
            if (import.meta.env.DEV) {
                console.log('[DrupalWebform] submit payload:', { webform_id: webformId, ...payload });
            }
            const fileData = {};
            elements.forEach(({ key, type }) => {
                const val = formData[key];
                if ((type === 'file' || type === 'webform_document_file') && val instanceof File) {
                    fileData[key] = val;
                }
            });
            const hasActualFiles = Object.keys(fileData).length > 0;

            if (hasActualFiles) {
                await submitWebformWithFile(webformId, payload, fileData, baseUrl);
            } else {
                await submitWebform(webformId, payload, baseUrl);
            }

            Swal.fire({
                icon: 'success',
                title: messages.successTitle,
                text: messages.successText,
                confirmButtonText: messages.ok,
                customClass: { popup: variant === 'partner' ? '' : 'swal-rtl' },
            });

            setFormData(getInitialFormData(elements));
            setErrors({});
            onSubmitSuccess?.();
        } catch (err) {
            const msg = err.message || messages.submitErrorGeneric;
            Swal.fire({
                icon: 'error',
                title: messages.submitErrorTitle,
                text: msg,
                confirmButtonText: messages.ok,
                customClass: { popup: variant === 'partner' ? '' : 'swal-rtl' },
            });
            onSubmitError?.(err);
        } finally {
            setSubmitting(false);
        }
    };

    const formMods = [
        'webform',
        variant === 'partner' && 'webform--partner',
        variant === 'partner' && 'webform--partner-card',
        formClassName,
    ]
        .filter(Boolean)
        .join(' ');

    if (loading) {
        return (
            <div className={`${formMods} webform--loading`.trim()}>
                <Loader />
            </div>
        );
    }

    if (loadError) {
        return (
            <div className={`${formMods} webform--load-failed`.trim()}>
                <p className="webform__message webform__message--error">{loadError}</p>
            </div>
        );
    }

    if (elements.length === 0) {
        return (
            <div className={`${formMods} webform--empty`.trim()}>
                <p>{messages.empty}</p>
            </div>
        );
    }

    const wrapPartnerIcon = (el, control) => {
        if (variant !== 'partner' || !partnerFieldUsesIcon(el)) {
            return control;
        }
        const Icon = getPartnerIcon(el);
        return (
            <div className="webform__input-icon-wrap">
                <span className="webform__input-icon" aria-hidden>
                    <Icon className="webform__input-icon-svg" size={20} strokeWidth={2} />
                </span>
                {control}
            </div>
        );
    };

    const renderField = (el) => {
        if (el.type === 'hidden') {
            return null;
        }

        const span = variant === 'partner' ? getPartnerFieldSpan(el) : 'full';
        const safeKeyClass = String(el.key || '')
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/g, '-');
        const fieldClass =
            variant === 'partner'
                ? `webform__field webform__field--partner webform__field--partner-${span} webform__field--key-${safeKeyClass}`
                : 'webform__field';
        const labelClass = [
            'webform__label',
            variant === 'partner' && 'webform__label--partner',
            variant === 'partner' &&
                (el.type === 'checkboxes' || el.type === 'radios') &&
                'webform__label--partner-checkboxes',
        ]
            .filter(Boolean)
            .join(' ');

        const inputClass =
            variant === 'partner'
                ? 'webform__input webform__input--partner webform__input--has-icon'
                : 'webform__input';
        const textareaClass =
            variant === 'partner'
                ? 'webform__textarea webform__textarea--partner'
                : 'webform__textarea';
        const selectClass =
            variant === 'partner'
                ? 'webform__input webform__select webform__input--partner webform__input--has-icon'
                : 'webform__input webform__select';

        return (
            <div key={el.key} className={fieldClass}>
                <label
                    className={labelClass}
                    htmlFor={el.type === 'checkboxes' || el.type === 'radios' ? undefined : el.key}
                >
                    {el.title}
                    {el.required && <span className="webform__required">*</span>}
                </label>
                {el.type === 'textarea' ? (
                    <textarea
                        id={el.key}
                        className={textareaClass}
                        placeholder={el.placeholder}
                        rows={variant === 'partner' ? 4 : 5}
                        value={formData[el.key] ?? ''}
                        onChange={(e) => handleChange(el.key, e.target.value)}
                        aria-invalid={!!errors[el.key]}
                        aria-required={el.required}
                    />
                ) : el.type === 'select' ? (
                    wrapPartnerIcon(
                        el,
                        <select
                            id={el.key}
                            className={selectClass}
                            value={formData[el.key] ?? ''}
                            onChange={(e) => handleChange(el.key, e.target.value)}
                            aria-invalid={!!errors[el.key]}
                            aria-required={el.required}
                        >
                            {el.options.map((opt) => (
                                <option key={opt.value || 'empty'} value={opt.value === '_none_' ? '' : opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )
                ) : el.type === 'radios' ? (
                    <div
                        className={`webform__radios ${variant === 'partner' ? 'webform__radios--partner' : ''}`}
                        role="radiogroup"
                        aria-labelledby={`${el.key}-radios-legend`}
                    >
                        <span id={`${el.key}-radios-legend`} className="webform__sr-only">
                            {el.title}
                        </span>
                        {el.options
                            .filter((opt) => opt.value !== '' && opt.value !== '_none_')
                            .map((opt) => {
                                const v = opt.value === '_none_' ? '' : opt.value;
                                return (
                                    <label
                                        key={opt.value || 'empty'}
                                        className={
                                            variant === 'partner'
                                                ? 'webform__radio-label webform__radio-label--partner'
                                                : 'webform__radio-label'
                                        }
                                    >
                                        <input
                                            type="radio"
                                            name={el.key}
                                            className={
                                                variant === 'partner'
                                                    ? 'webform__radio webform__radio--partner'
                                                    : 'webform__radio'
                                            }
                                            value={v}
                                            checked={(formData[el.key] ?? '') === v}
                                            onChange={() => handleChange(el.key, v)}
                                        />
                                        <span>{opt.label}</span>
                                    </label>
                                );
                            })}
                    </div>
                ) : el.type === 'checkboxes' ? (
                    <div
                        className={`webform__checkboxes ${variant === 'partner' ? 'webform__checkboxes--grid webform__checkboxes--partner' : ''}`}
                        role="group"
                        aria-labelledby={`${el.key}-legend`}
                    >
                        <span id={`${el.key}-legend`} className="webform__sr-only">
                            {el.title}
                        </span>
                        {el.options
                            .filter((opt) => opt.value !== '' && opt.value !== '_none_')
                            .map((opt) => (
                                <label
                                    key={opt.value}
                                    className={
                                        variant === 'partner'
                                            ? 'webform__checkbox-label webform__checkbox-label--partner'
                                            : 'webform__checkbox-label'
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        className={
                                            variant === 'partner'
                                                ? 'webform__checkbox webform__checkbox--partner'
                                                : 'webform__checkbox'
                                        }
                                        checked={
                                            Array.isArray(formData[el.key]) &&
                                            formData[el.key].includes(opt.value)
                                        }
                                        onChange={(e) => toggleCheckbox(el.key, opt.value, e.target.checked)}
                                    />
                                    <span>{opt.label}</span>
                                </label>
                            ))}
                    </div>
                ) : el.type === 'file' || el.type === 'webform_document_file' ? (
                    <label
                        className={
                            variant === 'partner'
                                ? 'webform__file-wrap webform__file-wrap--partner'
                                : 'webform__file-wrap'
                        }
                    >
                        <input
                            id={el.key}
                            type="file"
                            className="webform__file-input"
                            accept={el.fileAccept}
                            onChange={(e) => handleChange(el.key, e.target.files?.[0] ?? null)}
                            aria-invalid={!!errors[el.key]}
                            aria-required={el.required}
                        />
                        <span className="webform__file-label">
                            {formData[el.key] instanceof File
                                ? formData[el.key].name
                                : 'اضغط لرفع الملف أو قم بسحبه هنا'}
                        </span>
                        <span className="webform__file-hint">PDF, DOC, DOCX</span>
                    </label>
                ) : (
                    wrapPartnerIcon(
                        el,
                        <input
                            id={el.key}
                            type={
                                el.type === 'email'
                                    ? 'email'
                                    : el.type === 'tel'
                                      ? 'tel'
                                      : el.type === 'url'
                                        ? 'url'
                                        : el.type === 'number'
                                          ? 'number'
                                          : el.type === 'date'
                                            ? 'date'
                                            : el.type === 'datetime'
                                              ? 'datetime-local'
                                              : 'text'
                            }
                            className={inputClass}
                            placeholder={el.placeholder}
                            value={formData[el.key] ?? ''}
                            step={el.type === 'number' ? 'any' : undefined}
                            onChange={(e) => handleChange(el.key, e.target.value)}
                            aria-invalid={!!errors[el.key]}
                            aria-required={el.required}
                        />
                    )
                )}
                {errors[el.key] && <span className="webform__error">{errors[el.key]}</span>}
            </div>
        );
    };

    const renderChunk = (chunk) => {
        if (chunk.kind === 'row') {
            return (
                <div
                    key={`${chunk.rows[0].key}-${chunk.rows[1].key}`}
                    className={
                        variant === 'partner'
                            ? 'webform__field-row webform__field-row--partner'
                            : 'webform__field-row'
                    }
                >
                    {chunk.rows.map((el) => renderField(el))}
                </div>
            );
        }
        return renderField(chunk.el);
    };

    return (
        <form className={formMods} onSubmit={handleSubmit} noValidate>
            <div
                className={
                    variant === 'partner'
                        ? 'become-a-partner-form__grid webform__fields webform__fields--partner'
                        : 'webform__fields'
                }
            >
                {isFirstLastRow ? (
                    <>
                        <div className="webform__field-row">
                            {displayElements.slice(0, 2).map((el) => renderField(el))}
                        </div>
                        {buildChunks(displayElements.slice(2), fieldRows).map((c, idx) => (
                            <React.Fragment key={idx}>{renderChunk(c)}</React.Fragment>
                        ))}
                    </>
                ) : (
                    chunks.map((c, idx) => <React.Fragment key={idx}>{renderChunk(c)}</React.Fragment>)
                )}
            </div>

            <div
                className={
                    variant === 'partner'
                        ? 'become-a-partner-form__actions webform__actions webform__actions--partner'
                        : 'webform__actions'
                }
            >
                <button
                    type="submit"
                    className={variant === 'partner' ? 'webform__btn webform__btn--partner' : 'webform__btn'}
                    disabled={submitting}
                >
                    {submitting ? messages.submitting : submitLabel}
                </button>
                {secondaryButtonLabel && (
                    <button
                        type="button"
                        className={
                            variant === 'partner'
                                ? 'webform__btn-secondary webform__btn-secondary--partner'
                                : 'webform__btn-secondary'
                        }
                        onClick={onSecondaryAction}
                        disabled={submitting}
                    >
                        {secondaryButtonLabel}
                    </button>
                )}
            </div>
        </form>
    );
};

export default DrupalWebform;
