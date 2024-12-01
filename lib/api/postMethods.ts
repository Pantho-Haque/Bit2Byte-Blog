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
}

export async function signUpUser(
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }
    const responseData: SignUpResponse = await response.json();
    return responseData;
  } catch (error) {
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

    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(`Error: ${errorText}`);
    // }

    const responseData: LoginResponse = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
}
