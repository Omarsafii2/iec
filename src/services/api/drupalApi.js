import axios from 'axios';

// Configure your Drupal backend URL
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_URL || 'http://localhost:8000';

// Create axios instance with default config
const drupalApi = axios.create({
  baseURL: DRUPAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for authentication if needed
drupalApi.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('drupal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
drupalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// API Functions

/**
 * Fetch all news articles from Drupal
 * Endpoint example: /jsonapi/node/article
 */
export const fetchNews = async () => {
  try {
    // IMPORTANT: Add ?include=field_image to get image data
    const response = await drupalApi.get('/jsonapi/node/news?include=field_image');
    console.log('API Response:', response.data); // Debug log

    // Transform Drupal JSON:API response to simpler format
    return response.data.data.map(item => {
      // Get  image URL
      let imageUrl = 'https://placehold.co/400x300/4A90E2/ffffff?text=No+Image';

      // Check if image relationship exists
      if (item.relationships?.field_image?.data) {
        const imageId = item.relationships.field_image.data.id;

        // Find the image file in included data
        if (response.data.included) {
          const imageFile = response.data.included.find(
            included => included.type === 'file--file' && included.id === imageId
          );

          if (imageFile?.attributes?.uri?.url) {
            imageUrl = `${DRUPAL_BASE_URL}${imageFile.attributes.uri.url}`;
          }
        }
      }

      // Get excerpt from body
      let excerpt = '';
      if (item.attributes.body) {
        if (item.attributes.body.summary) {
          excerpt = item.attributes.body.summary;
        } else if (item.attributes.body.value) {
          // Strip HTML and get first 150 chars
          excerpt = item.attributes.body.value.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        }
      }

      console.log('Article:', item.attributes.title, 'Image URL:', imageUrl); // Debug log

      return {
        id: item.id,
        title: item.attributes.title,
        excerpt: excerpt,
        image: imageUrl,
        date: item.attributes.created,
        author: item.attributes.uid?.display_name || 'Admin'
      };
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};


/**
 * Fetch single news article by ID
 */
export const fetchNewsById = async (id) => {
  try {
const response = await drupalApi.get(`/jsonapi/node/news/${id}`);
    const item = response.data.data;
    return {
      id: item.id,
      title: item.attributes.title,
      body: item.attributes.body?.value,
      image: item.relationships.field_image?.data
        ? `${DRUPAL_BASE_URL}${item.relationships.field_image.data.attributes.uri.url}`
        : null,
      date: item.attributes.created,
      author: item.relationships.uid?.data?.attributes?.display_name || 'Anonymous'
    };
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw error;
  }
};

/**
 * Fetch slider/banner content from Drupal
 * Endpoint example: /jsonapi/node/slider
 */


/**
 * Submit contact form to Drupal
 * Endpoint example: /webform_rest/submit
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await drupalApi.post('/webform_rest/contact/submit', {
      webform_id: 'contact',
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

/**
 * Fetch page content by path
 * Endpoint example: /jsonapi/node/page
 */
export const fetchPageContent = async (path) => {
  try {
    const response = await drupalApi.get(`/jsonapi/node/page`, {
      params: {
        'filter[path.alias]': path
      }
    });
    const item = response.data.data[0];
    if (!item) return null;

    return {
      id: item.id,
      title: item.attributes.title,
      body: item.attributes.body?.value,
      created: item.attributes.created
    };
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw error;
  }
};

/**
 * Fetch menu items
 * Endpoint example: /jsonapi/menu_items/main
 */
export const fetchMenuItems = async (menuName = 'main') => {
  try {
    const response = await drupalApi.get(`/jsonapi/menu_items/${menuName}`);
    return response.data.data.map(item => ({
      id: item.id,
      title: item.attributes.title,
      url: item.attributes.url,
      weight: item.attributes.weight
    })).sort((a, b) => a.weight - b.weight);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export default drupalApi;
