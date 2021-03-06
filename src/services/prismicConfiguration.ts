// -- Prismic Repo Name
export const repoName = "ignews-my";

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.prismic.io/api/v2`;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_ACESS_TOKEN || "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc: any) => {
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }
  return "/";
};
