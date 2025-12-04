# NPM Publishing Security Guide

## ✅ Protections Already In Place

### 1. GitHub Workflow Protection
The publish workflow now includes:
- ✅ **Owner-only publishing** - Only you (RoyLeibo) can trigger the workflow
- ✅ **Version check** - Prevents publishing if version already exists on npm
- ✅ **Automatic validation** - Runs tests before publishing

### 2. How It Works

```yaml
# Only repository owner can publish
if: github.actor == github.repository_owner || github.actor == 'RoyLeibo'

# Checks if version exists before publishing
- name: Check if version exists on npm
  run: |
    if version exists; then
      exit 1  # Fail the workflow
    fi
```

---

## 🔒 Additional Security Steps (Recommended)

### 1. Secure Your NPM Account

#### Enable 2FA (Two-Factor Authentication)
```bash
npm profile enable-2fa
```

Or via web:
1. Go to https://www.npmjs.com/settings/[your-username]/tfa
2. Enable 2FA for "Authorization and Publishing"
3. Use an authenticator app (Google Authenticator, Authy, etc.)

**⚠️ IMPORTANT:** With 2FA enabled, automated publishing requires an "Automation" token (which you should already have).

---

### 2. Manage NPM Package Access

#### Check Current Collaborators
```bash
npm owner ls phone-number-generator-js
```

#### Remove Unwanted Collaborators
```bash
npm owner rm <username> phone-number-generator-js
```

#### Add Collaborators (if needed) - Read-Only
You can add collaborators with limited permissions through npm organizations, but for this package, it's best to keep it to yourself only.

---

### 3. Token Security

#### Your NPM_TOKEN Should Be:
- ✅ Type: "Automation" (for CI/CD)
- ✅ Stored in: GitHub Secrets only
- ✅ Never committed to code
- ✅ Rotated periodically (every 6-12 months)

#### Check Your Tokens
1. Go to https://www.npmjs.com/settings/[your-username]/tokens
2. Review all active tokens
3. Delete any unused or old tokens

#### Rotate Token (Recommended Every 6 Months)
1. Create new "Automation" token on npm
2. Update `NPM_TOKEN` in GitHub Secrets
3. Delete old token from npm

---

### 4. GitHub Repository Protection

#### Branch Protection Rules
1. Go to: Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Do not allow bypassing the above settings

#### Action Permissions
1. Go to: Settings → Actions → General
2. Workflow permissions:
   - Select "Read repository contents permission"
   - Check "Allow GitHub Actions to create and approve pull requests"

---

### 5. Version Management Best Practices

#### Before Publishing:
1. **Bump version in package.json**
   ```bash
   npm version patch  # 1.2.16 → 1.2.17
   npm version minor  # 1.2.16 → 1.3.0
   npm version major  # 1.2.16 → 2.0.0
   ```

2. **Commit version bump**
   ```bash
   git add package.json
   git commit -m "chore: bump version to X.Y.Z"
   git push origin main
   ```

3. **Create GitHub Release**
   - Go to Releases → Draft a new release
   - Tag: `vX.Y.Z` (e.g., v1.2.17)
   - Title: `Release vX.Y.Z`
   - Description: Changelog
   - Click "Publish release"

4. **Workflow automatically publishes to npm** ✨

---

## 🚨 What Happens If Someone Tries to Publish?

### Scenario 1: Someone forks your repo and tries to publish
❌ **Blocked** - They don't have your NPM_TOKEN

### Scenario 2: Someone creates a PR that modifies the workflow
❌ **Blocked** - You review the PR before merging

### Scenario 3: Someone gets access to your GitHub account
⚠️ **Risk** - Enable 2FA on GitHub to prevent this

### Scenario 4: Trying to publish same version twice
❌ **Blocked** - Workflow checks and fails before publishing

### Scenario 5: Someone else tries to trigger the workflow
❌ **Blocked** - Workflow checks `github.actor == 'RoyLeibo'`

---

## 📋 Security Checklist

Use this checklist to ensure your package is secure:

- [ ] 2FA enabled on npm account
- [ ] 2FA enabled on GitHub account
- [ ] NPM_TOKEN is "Automation" type
- [ ] NPM_TOKEN stored only in GitHub Secrets
- [ ] Only you listed as package owner on npm
- [ ] Branch protection rules enabled on main branch
- [ ] Workflow protection in place (already done ✅)
- [ ] Version check in place (already done ✅)
- [ ] Regular token rotation scheduled (6-12 months)
- [ ] Review npm package access periodically

---

## 🔄 Publishing Workflow

### Safe Publishing Process:

```bash
# 1. Make your changes
git add .
git commit -m "feat: your feature"

# 2. Bump version
npm version patch  # or minor/major

# 3. Push changes
git push origin main

# 4. Create GitHub Release
# Go to GitHub → Releases → New Release
# Tag: v1.2.17
# Publish

# 5. Workflow automatically:
#    - Checks you're the owner ✅
#    - Checks version doesn't exist ✅
#    - Runs tests ✅
#    - Builds package ✅
#    - Publishes to npm ✅
```

---

## 🛡️ Emergency Procedures

### If Your NPM Token Is Compromised:
1. **Immediately** go to https://www.npmjs.com/settings/[your-username]/tokens
2. Delete the compromised token
3. Create a new "Automation" token
4. Update `NPM_TOKEN` in GitHub Secrets
5. Check npm package versions - unpublish any unauthorized versions:
   ```bash
   npm unpublish phone-number-generator-js@<bad-version>
   ```

### If Someone Published an Unauthorized Version:
1. Contact npm support: support@npmjs.com
2. Unpublish the version (within 72 hours):
   ```bash
   npm unpublish phone-number-generator-js@<version>
   ```
3. Rotate your NPM token
4. Review GitHub access logs

---

## 📞 Support

- **npm Support:** https://www.npmjs.com/support
- **GitHub Security:** https://github.com/security
- **2FA Issues:** https://docs.npmjs.com/about-two-factor-authentication

---

## Summary

Your package is now protected with:
1. ✅ Owner-only publishing via GitHub Actions
2. ✅ Automatic version duplicate prevention
3. ✅ Tests must pass before publishing
4. ✅ Build verification before publishing

**Next Steps:**
1. Enable 2FA on npm (if not already enabled)
2. Enable 2FA on GitHub (if not already enabled)
3. Review and verify you're the only package owner
4. Set a reminder to rotate your NPM token in 6 months

**Your package is secure! 🔒**

