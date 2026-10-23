const lookupForm = document.getElementById("lookup-form");
const lookupButton = document.getElementById("lookup-button");
const statusElement = document.getElementById("status");
const profileTable = document.getElementById("profile");
const pictureParagraph = document.getElementById("profile-picture");
const blogCell = document.getElementById("profile-blog");

// Only HTTP and HTTPS blog addresses become clickable links.
const displayBlog = blog => {
  blogCell.textContent = blog || "Not provided";
  if (!blog) return;

  const address = /^[a-z][a-z\d+.-]*:/i.test(blog) ? blog : `https://${blog}`;
  try {
    const url = new URL(address);
    if (url.protocol === "http:" || url.protocol === "https:") {
      const link = document.createElement("a");
      link.href = url.href;
      link.textContent = blog;
      blogCell.replaceChildren(link);
    }
  } catch (error) {
    // Preserve non-URL blog values as ordinary text.
  }
};

lookupForm.addEventListener("submit", event => {
  event.preventDefault();
  const login = document.getElementById("login").value.trim();
  profileTable.hidden = true;
  pictureParagraph.replaceChildren();
  if (!login) {
    statusElement.textContent = "Enter a GitHub login.";
    return;
  }

  lookupButton.disabled = true;
  statusElement.textContent = "Loading profile...";
  fetch(`https://api.github.com/users/${encodeURIComponent(login)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(user => {
      const picture = document.createElement("img");
      picture.src = user.avatar_url;
      picture.alt = `${user.login}'s profile picture`;
      pictureParagraph.appendChild(picture);
      document.getElementById("profile-name").textContent = user.name || "Not provided";
      displayBlog(user.blog);
      document.getElementById("profile-created").textContent = user.created_at;
      profileTable.hidden = false;
      statusElement.textContent = "";
    })
    .catch(error => {
      statusElement.textContent = `Could not load profile: ${error.message}`;
      console.error("Could not load profile:", error);
    })
    .finally(() => {
      lookupButton.disabled = false;
    });
});
