export function handleIdentities(store, action, identity, newIdentity?) {
  let identities = store.get("identities", []);

  switch (action) {
    case "add":
      if (!identity.name || identities.some((i) => i.name === identity.name)) {
        throw new Error("Identity already exists or name is missing");
      }

      identities.push(identity);
      break;

    case "rename":
      const existingIdentityIndex = identities.findIndex(
        (i) => i.name === identity.name
      );
      if (existingIdentityIndex === -1) {
        throw new Error("Identity to rename not found");
      }
      if (identities.some((i) => i.name === newIdentity)) {
        throw new Error("New identity name already exists");
      }
      identities[existingIdentityIndex] = {
        ...identities[existingIdentityIndex],
        name: newIdentity,
      };
      break;

    case "delete":
      const keyToDelete = identity.isInternetIdentity
        ? "internetIdentityPrincipal"
        : "name";
      identities = identities.filter(
        (i) => i[keyToDelete] !== identity[keyToDelete]
      );
      break;

    case "get":
      if (identity) {
        const keyToFind = identity.isInternetIdentity
          ? "internetIdentityPrincipal"
          : "name";
        const requestedIdentity = identities.find(
          (i) => i[keyToFind] === identity[keyToFind]
        );
        return requestedIdentity || null;
      }
      return identities;

    case "list":
      // Return all identities
      return identities;

    default:
      throw new Error("Invalid action");
  }

  store.set("identities", identities);
  return identities;
}
