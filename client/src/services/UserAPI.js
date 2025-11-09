async function createUser(username, password) {
  try {
    await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  } catch (error) {
    console.log(`Error creating user: ${error}`);
  }
}

async function verifyUser(username, password) {
  try {
    await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    //const json = await response.json();
    return true;
  } catch (error) {
    console.log(`Error verifying user: ${error}`);
    return false;
  }
}

export default { createUser, verifyUser };
