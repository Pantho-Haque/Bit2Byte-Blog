"use server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//register user
export interface SignUpParams {
  email: string;
  password: string;
  name: string;
  photo: File;
}

export interface SignUpResponse {
  data: {
    username: string;
  };
  message: string;
  success:boolean;
}

export async function signUpUser(
  // params: SignUpParams
  formData: FormData
): Promise<SignUpResponse> {
  // const { email, password, name, photo } = params;

  // const formData = new FormData();
  // formData.append("email", email);
  // formData.append("password", password);
  // formData.append("name", name);
  // formData.append("photo", photo);

  try {
    const response = await fetch(`${BASE_URL}/sign_up`, {
      method: "POST",
      body: formData,
    });

    // if (!response.ok) {
    //   throw JSON.parse(await response.text());
    // }
    const responseData: SignUpResponse = await response.json();
    return responseData;

  } catch (error) {
    // throw error;
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
}

// login user

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    username: string;
    token: string;
  };
  message: string;
  status:"error"|"warning"|"info"|"success";
}

export async function loginUser(params: LoginParams): Promise<LoginResponse> {
  const { email, password } = params;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseData: LoginResponse = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
}

// Blog management
export async function deleteBlog(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_blog?blog_id=${id}`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

export async function saveBlogInfo(blogInfo: any, image: File | null) {
  try {
    const formData = new FormData();
    formData.append('blog_info', JSON.stringify(blogInfo));
    if (image) {
      formData.append('image', image);
    }
    
    const response = await fetch(`${BASE_URL}/save_blog_info`, {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving blog info:', error);
    throw error;
  }
}

export async function saveBlogDetails(id: number, content: string) {
  try {
    const response = await fetch(`${BASE_URL}/save_blog_details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        content
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving blog details:', error);
    throw error;
  }
}

// Category (Topic) management
export async function saveTopic(topicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/save_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving topic:', error);
    throw error;
  }
}

export async function updateTopic(topicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/update_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
}

export async function deleteTopic(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_topic?topic_id=${id}`, {
      method: 'POST'
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
}

// Subtopic management
export async function saveSubtopic(subtopicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/save_sub_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtopicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving subtopic:', error);
    throw error;
  }
}

export async function updateSubtopic(subtopicData: any) {
  try {
    const response = await fetch(`${BASE_URL}/update_sub_topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtopicData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error updating subtopic:', error);
    throw error;
  }
}

export async function deleteSubtopic(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_sub_topic?sub_topic_id=${id}`, {
      method: 'POST'
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting subtopic:', error);
    throw error;
  }
}
