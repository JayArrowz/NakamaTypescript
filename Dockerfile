FROM node:alpine AS node-builder

WORKDIR /backend

COPY package*.json ./
COPY babel.config.json ./
COPY rollup.config.js ./
COPY tsconfig.json ./
COPY ./src/ ./src/

RUN npm install
RUN rm -rf "node_modules/typescript-collections/dist/lib/umd.js"
RUN rm -rf "node_modules/typescript-collections/dist/lib/umd.min.js"
RUN npx rollup -c

FROM registry.heroiclabs.com/heroiclabs/nakama:3.12.0
COPY --from=node-builder /backend/build/*.js /nakama/data/modules/build/
COPY local.yml /nakama/data/