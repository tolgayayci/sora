// Projects Notifications
export const projectCreateSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been created successfully.`,
});

export const projectCreateError = (contentName: string, error: string) => ({
  title: "Error",
  description: `Failed to create ${contentName}. ${error}`,
});

export const projectImportSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been imported successfully.`,
});

export const projectImportError = (contentName: string) => ({
  title: "Error",
  description: `Failed to import ${contentName}. Make sure you selected folder that containing Cargo.toml and includes stylus-sdk dependency!`,
});

export const projectRenameSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been renamed successfully.`,
});

export const projectRenameError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to rename ${contentName}.`,
});

export const projectRemoveSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been removed successfully.`,
});

export const projectRemoveError = (contentName: string, error: string) => ({
  title: "Error",
  description: `Failed to remove ${contentName}. ${error}`,
});

// --- Identity Notifications ---

export const identityCreateSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been created successfully.`,
});

export const identityCreateError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to create ${contentName}.`,
});

export const identityImportSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been imported successfully.`,
});

export const identityImportError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to import ${contentName}.`,
});

export const identityInternetIdentityLoginSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been logged in successfully.`,
});

export const identityInternetIdentityLoginError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to log in ${contentName}.`,
});

export const identityRenameSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been renamed successfully.`,
});

export const identityRenameError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to rename ${contentName}.`,
});

export const identityRemoveSuccess = (contentName: string) => ({
  title: "Success",
  description: `${contentName} has been removed successfully.`,
});

export const identityRemoveError = (contentName: string) => ({
  variant: "destructive",
  title: "Error",
  description: `Failed to remove ${contentName}.`,
});

export const protectedIdentityRemoveError = (contentName: string) => ({
  title: "Error",
  description: `Failed to remove ${contentName}. You can't delete the ${contentName} identity!`,
});
