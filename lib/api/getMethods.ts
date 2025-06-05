const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

console.log("API BASE_URL:", BASE_URL);

const revalidationTime = 10;

export async function getAllBlogs(page = 0, itemsPerPage = 12) {
  try {
    const url = `${BASE_URL}/read_blogs?page=${page}&item_per_page=${itemsPerPage}`;
    console.log("Fetching blogs from:", url);
    
    const result: any = await fetch(url, {
      // cache: "no-store",
      next: {
        revalidate: revalidationTime,
      },
    });
    
    if (!result.ok) {
      console.error(`Failed to fetch blogs: ${result.status} ${result.statusText}`);
      throw new Error(`Error occurred while fetching: ${result.status} ${result.statusText}`);
    }
    
    const data = await result.json();
    console.log("Blog data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    throw error;
  }
}

export async function getSingleBlog(id: string) {
  const result: any = await fetch(`${BASE_URL}/read_blog_details/${id}`, {
    //   cache: "no-store",
    next: {
      revalidate: revalidationTime,
    },
  });
  if (!result.ok) {
    throw new Error("Error occured while fetching");
  }
  return result.json();
}

export async function getSyllabus() {
  try {
    const url = `${BASE_URL}/read_syllabus`;
    console.log("Fetching syllabus from:", url);
    
    const result: any = await fetch(url, {
      //   cache: "no-store",
      next: {
        revalidate: revalidationTime,
      },
    });
    
    if (!result.ok) {
      console.error(`Failed to fetch syllabus: ${result.status} ${result.statusText}`);
      throw new Error(`Error occurred while fetching: ${result.status} ${result.statusText}`);
    }
    
    const data = await result.json();
    console.log("Syllabus data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getSyllabus:", error);
    throw error;
  }
}

export async function getFilteredBlog(topic: string, subtopic: string | null) {
  try {
    let url = `${BASE_URL}/filter_by?topic=${topic}` + (subtopic ? `&subtopic=${subtopic}` : "");
    console.log("Fetching filtered blogs from:", url);
    
    const result: any = await fetch(url, {
      //   cache: "no-store",
      next: {
        revalidate: revalidationTime,
      },
    });
    
    if (!result.ok) {
      console.error(`Failed to fetch filtered blogs: ${result.status} ${result.statusText}`);
      throw new Error(`Error occurred while fetching: ${result.status} ${result.statusText}`);
    }
    
    const data = await result.json();
    console.log("Filtered blog data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getFilteredBlog:", error);
    throw error;
  }
}

export async function getRedirectName(title: string) {
  try {
    const url = `${BASE_URL}/read_link?title=${title}`;
    const result = await fetch(url, {
      next: {
        revalidate: revalidationTime,
      },
    });

    if (!result.ok) {
      throw Error(
        `API responded with status: ${result.status} ${result.statusText}`
      );
    }

    // Ensure the response is valid JSON
    const text = await result.text(); // Read response as text
    if (!text) {
      throw Error("API response is empty");
    }

    return JSON.parse(text); // Parse to JSON
  } catch (error) {
    console.error("Error in getRedirectName:", error);
    throw error;
  }
}
