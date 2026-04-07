import { FileText, Download } from 'lucide-react';
import { downloadPublicFile } from '../../../../lib/downloadPublicFile.js';
import { BYLAWS_PDF_DOWNLOAD_NAME, BYLAWS_PDF_PATH } from './bylawsPdf.js';

/** محتوى صفحة النظام الداخلي + زر تحميل PDF */
export function BylawsSection({ pdfHref = BYLAWS_PDF_PATH, downloadName = BYLAWS_PDF_DOWNLOAD_NAME }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <div className="rounded-3xl border border-gray-100 bg-white p-12 shadow-lg">
          <div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56]"
            aria-hidden
          >
            <FileText className="size-12" strokeWidth={2} />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-[#564636]">النظام الداخلي للنادي</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">
            يمكنكم الاطلاع على النسخة الكاملة من النظام الداخلي لنادي خريجي الكلية العلمية الإسلامية،
            والذي ينظم عمل النادي وحقوق وواجبات الأعضاء.
          </p>
          <button
            type="button"
            onClick={() => void downloadPublicFile(pdfHref, downloadName)}
            className="mx-auto flex h-14 w-fit cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#564636] px-8 py-2 text-lg font-medium whitespace-nowrap text-white shadow-lg ring-offset-background transition-all hover:bg-[#3e3226] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="size-5 shrink-0" strokeWidth={2} aria-hidden />
            تحميل ملف PDF
          </button>
        </div>
      </div>
    </div>
  );
}
