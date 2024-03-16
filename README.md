> :warning: **This application in still beta!** When using application be aware of something unexpected may be occur. **Use at your own risk**, don't try important things like very important identities and so on!

# SORA

SORA is a cross platform, electron based application designed to streamline the use of the Soroban CLI. It offers a user-friendly interface for managing projects, identities, networks, and contract methods with ease.
  
---

## Installation

To use this application, you must have soroban cli installed on your operating system. 

> This application is compatible with latest soroban v0.23.0, please make sure you have installed this version or newer of soroban!

- To install soroban, follow the instructions in link below:
  - [Install Soroban](https://soroban.stellar.org/docs/getting-started/setup)

- To verify that soroban properly installed, run:
```soroban --version```

Now that you have soroban installed, you can install the SORA application by following the instructions below.

###  macOS (Apple Silicon | Intel)

1. Download the latest release for macOS 
   1. [Apple Silicon](https://github.com/tolgayayci/soroban-cli-gui/releases/download/v0.1.0/soroban-cli-gui-0.1.0-arm64.dmg)
   2. [Intel](https://github.com/tolgayayci/soroban-cli-gui/releases/download/v0.1.0/soroban-cli-gui-0.1.0-universal.dmg)
2. Open the downloaded file and drag the application to Applications folder.

### 🐧 Linux

1. Download the latest release for Linux 
   1. [App Image](https://github.com/tolgayayci/soroban-cli-gui/releases/download/v0.1.0/soroban-cli-gui-0.1.0.AppImage)
   2. [Snap](https://github.com/tolgayayci/soroban-cli-gui/releases/download/v0.1.0/soroban-cli-gui_0.1.0_amd64.snap)

2. Follow the general instructions to install the application on your Linux distribution.
   1. [App Image](https://docs.appimage.org/introduction/quickstart.html#ref-quickstart)
   2. [Snap](https://snapcraft.io/docs/installing-snapd)

### 💻 Windows (Not Fully Supported)

You can still use the SORA application on Windows by following the instructions below.

1. Install WSL 2 by following the instructions [on microsoft docs](https://learn.microsoft.com/en-us/windows/wsl/install).
2. Once you have WSL installed, you can install soroban cli by following the instructions for Linux. 
3. Follow the instructions for Linux to install the SORA application.
---

## Key Features

**Project Management:** This feature allows users to efficiently manage their projects. It includes capabilities to create new projects, add existing ones from your device, and delete projects that are no longer needed. 

**Identity Management:** This component focuses on managing user identities. Users can generate new identities, add existing ones, delete unnecessary identities, and seamlessly switch between different identities. 

**Contract Interactions:** This feature is centered around interactions with contracts (project based). Users can interact with them using a variety of contract commands, arguments, and flags through a user-friendly interface.

**Network Management:** Network management is facilitated through the ability to add and remove networks. Users can also display the list of networks.

> **P.S:** Review the [latest release notes](https://github.com/tolgayayci/soroban-cli-gui/releases/tag/v0.1.0) for more information about the features and capabilities of the SORA application.

## Contributing

Contributions are welcomed! If you have feature requests, bug notifications or want to contribute some code, please follow the instructions below.
-  **Feature Requests:** Use the [feature requests issue](https://github.com/tolgayayci/soroban-cli-gui/issues/new?assignees=tolgayayci&labels=enhancement&projects=&template=feature_request.md&title=%5BFEAT%5D) template.
-  **Bug Reports:** Use the [bug reports issue](https://github.com/tolgayayci/soroban-cli-gui/issues/new?assignees=tolgayayci&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D) template. 
-  **Code Contributions**
   -  Fork this repository 
   -  Create a new branch
   -  Make your changes
   -  Commit your changes
   -  Push to the branch that you opened
   -  Create a new pull request with some details about your changes
  
## License

SORA is released under the **MIT**. See ([LICENSE](https://github.com/tolgayayci/soroban-cli-gui/blob/main/LICENSE)) for more details.
