const BASE_URL = "http://130.51.120.58:8080/api/v1";
const revalidationTime = 10;

export async function getAllBlogs() {
  const result: any = await fetch(`${BASE_URL}/read_blogs`, {
    // cache: "no-store",
    next: {
      revalidate: revalidationTime,
    },
  });
  if (!result.ok) {
    throw new Error("Error occured while fetching");
  }
  return result.json();
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
    const result: any = await fetch(`${BASE_URL}/read_syllabus`, {
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
export async function getFilteredBlog(topic:string,subtopic:string|null) {
    let url=""
    if(subtopic){
      url=`${BASE_URL}/filter_by?topic=${topic}&subtopic=${subtopic}`;
    }else{
      url= `${BASE_URL}/filter_by?topic=${topic}`
    }
    const result: any = await fetch(url, {
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
  
