#Inicializa un nuevo proyecto React Native con Expo
expo init <nombre_proyecto>

#Dependencias necesarias para navegacion y construccion de componentes.
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

yarn add @react-navigation/drawer

Comandos GIT subir fuentes a repo.

git init -b <branch_name>
git remote add origin <repo_url>
git remote -v
git add . && git commit -m "initial commit"
git push origin <branch_name>
