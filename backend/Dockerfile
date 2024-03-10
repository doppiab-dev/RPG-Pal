FROM maven:3.9.6-eclipse-temurin-21-alpine

#il dockerfile non legge da ./backend/ e non capisco in che path sia posizionato.
# i singoli comandi copy non trovano i file da copiare
# Es. COPY pom.xml /workspace da errore, nonostante gli snippet da IDE trovino tutti i file correttamente
# la copy fatta come sotto non so cosa copia, ma quando il be prova a startare non trova il pom.xml e fallisce.

COPY . /workspace
WORKDIR /workspace

CMD mvn clean compile

