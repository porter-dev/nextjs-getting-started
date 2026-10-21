# Next.js on Porter

A minimal Next.js App Router app, packaged as a standalone Docker image and ready to deploy on Porter.

## What's inside

| Component | Version | Notes |
| --- | --- | --- |
| Node.js | 24 (active LTS) | `node:24-alpine` base image, see `.nvmrc` |
| Next.js | 16.4.2 | App Router, `output: "standalone"` |
| React | 19.3.1 | |

| Endpoint | Method | Response |
| --- | --- | --- |
| `/` | GET | A page confirming the app is running |
| `/healthz` | GET | `200` with `{"status":"ok"}` |

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

With Docker:

```sh
docker build -t nextjs-getting-started . && docker run -p 3000:3000 nextjs-getting-started
```

The container listens on `0.0.0.0` and uses `$PORT` when set, otherwise port 3000.

## Deploy on Porter

### From the dashboard

1. Fork this repo.
2. In https://dashboard.porter.run, create a new app from your GitHub repo.
3. Porter reads `porter.yaml`, builds the Dockerfile, and opens a PR adding a GitHub Actions workflow.
4. Merge it. Every push to `main` redeploys.

See https://docs.porter.run/applications/deploy/deploy-from-github-repo for details.

### From the CLI

1. Install the CLI: https://docs.porter.run/cli/installation
2. Log in with `porter auth login`.
3. Deploy with `porter apply -f porter.yaml`.

## Configuration

`porter.yaml` defines one web service:

| Field | Value | Purpose |
| --- | --- | --- |
| `build.method` | `docker` | Build from the `Dockerfile` at the repo root |
| `services[].run` | `node server.js` | Start the Next.js standalone server |
| `services[].port` | `3000` | Port the service listens on |
| `services[].cpuCores` | `0.25` | CPU allotted to each instance |
| `services[].ramMegabytes` | `512` | Memory allotted to each instance |
| `services[].healthCheck.httpPath` | `/healthz` | Path Porter polls to check the service is healthy |

| Name | Required | Description |
| --- | --- | --- |
| `PORT` | No | Port to listen on. Defaults to `3000`. |
| `HOSTNAME` | No | Interface to bind. Defaults to `0.0.0.0` in the image. |

Full reference: https://docs.porter.run/applications/configuration-as-code/reference

## Learn more

- https://docs.porter.run/getting-started/quickstart
- https://docs.porter.run/applications/configuration-as-code/overview
- https://docs.porter.run/applications/configure/environment-groups
- https://docs.porter.run/addons/datastores
- https://docs.porter.run/preview-environments/overview
- https://github.com/porter-dev/starters
