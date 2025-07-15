# GitHub Actions Setup Guide

This document provides instructions for setting up the GitHub Actions workflows for the room-planner project.

## 🚀 Workflows Summary

The project includes 4 GitHub Actions workflows:

1. **CI** (`ci.yml`) - Continuous Integration for all pushes and PRs
2. **Deploy** (`deploy.yml`) - Deploys sample app to GitHub Pages
3. **Library Tests** (`library-tests.yml`) - Focused library testing for PRs
4. **Publish Library** (`publish-library.yml`) - Publishes library to npm

## ✅ Repository Setup Required

### 1. GitHub Pages Configuration

**Settings → Pages:**

- **Source:** Deploy from a branch → GitHub Actions
- **Custom domain:** (optional)

**Settings → Actions → General:**

- **Workflow permissions:** Read and write permissions
- **Allow GitHub Actions to create and approve pull requests:** ✅

### 2. Repository Secrets

Navigate to **Settings → Secrets and variables → Actions** and add:

#### Required Secrets:

- **`NPM_TOKEN`** - For publishing to npm registry
  - Go to [npmjs.com](https://www.npmjs.com/settings/tokens)
  - Create new "Automation" token
  - Copy and paste into GitHub secrets

#### Optional Secrets:

- **`GITHUB_TOKEN`** - Automatically provided by GitHub Actions

### 3. Branch Protection Rules

**Settings → Branches → Add rule for `main`:**

- **Require a pull request before merging:** ✅
- **Require approvals:** 1
- **Dismiss stale PR approvals when new commits are pushed:** ✅
- **Require status checks to pass before merging:** ✅
  - **Status checks:** `build-and-test` (from CI workflow)
- **Require branches to be up to date before merging:** ✅
- **Restrict pushes to matching branches:** ✅
- **Include administrators:** ✅

### 4. Package.json Configuration

Update the library package name in `projects/room-planner-lib/package.json`:

```json
{
  "name": "@your-org/room-planner",
  "version": "1.0.0"
}
```

Replace `@your-org` with your npm organization or scope.

## 🔧 Workflow Triggers

### CI Workflow

- **Automatic:** Every push to `main`, every PR
- **Manual:** Repository → Actions → CI → Run workflow

### Deploy Workflow

- **Automatic:** After successful CI on `main` branch
- **Manual:** Not available (depends on CI artifacts)

### Library Tests Workflow

- **Automatic:** PRs affecting library files
- **Manual:** Repository → Actions → Library Tests → Run workflow

### Publish Library Workflow

- **Manual:** Repository → Actions → Publish Library → Run workflow
  - Choose version bump: patch/minor/major
- **Automatic:** When GitHub release is published

## 📦 Publishing Process

### Manual Publishing (Recommended)

1. Go to **Repository → Actions → Publish Library**
2. Click **Run workflow**
3. Select version bump type (patch/minor/major)
4. Click **Run workflow**
5. Workflow will:
   - Run tests and build
   - Bump version in both library and root package.json
   - Create git commit and tag
   - Publish to npm
   - Create GitHub release

### Automatic Publishing

1. Create a GitHub release manually
2. Workflow will automatically publish to npm

## 🔍 Monitoring Workflows

### Check Workflow Status

- **Repository → Actions** - View all workflow runs
- **PR checks** - See status in pull request
- **Commit status** - See status on commit page

### Workflow Artifacts

- **Library builds** - Download from CI workflow runs
- **Sample app builds** - Download from CI workflow runs
- **npm packages** - Available on npmjs.com after publish

### Troubleshooting

- **Build failures:** Check workflow logs in Actions tab
- **Deploy failures:** Verify GitHub Pages settings
- **Publish failures:** Verify npm token and package name
- **Test failures:** Run tests locally first

## 🎯 Next Steps

1. Configure repository settings as described above
2. Set up npm token for publishing
3. Update package name in library package.json
4. Test workflows by creating a PR
5. Test publishing by running manual workflow
6. Set up branch protection rules

## 📋 Verification Checklist

- [ ] GitHub Pages enabled and configured
- [ ] NPM_TOKEN secret added
- [ ] Package name updated in library package.json
- [ ] Branch protection rules configured
- [ ] CI workflow passes on main branch
- [ ] Deploy workflow deploys sample app successfully
- [ ] Library tests workflow runs on PRs
- [ ] Publish workflow can publish to npm

Once all items are checked, your workflows will be fully operational! 🎉
