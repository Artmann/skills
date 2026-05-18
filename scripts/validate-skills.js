#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const YAML = require('yaml')

const SKILLS_DIR = path.join(__dirname, '..', 'skills')
const MIN_DESCRIPTION_LENGTH = 40

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  return YAML.parse(match[1])
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`error: ${SKILLS_DIR} does not exist`)
    process.exit(1)
  }

  const entries = fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())

  if (entries.length === 0) {
    console.error(`error: no skill directories found in ${SKILLS_DIR}`)
    process.exit(1)
  }

  const errors = []

  for (const entry of entries) {
    const skillName = entry.name
    const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md')
    const relPath = path.relative(process.cwd(), skillPath)

    if (!fs.existsSync(skillPath)) {
      errors.push(`${relPath}: missing SKILL.md`)
      continue
    }

    const source = fs.readFileSync(skillPath, 'utf8')
    let frontmatter
    try {
      frontmatter = parseFrontmatter(source)
    } catch (err) {
      errors.push(`${relPath}: failed to parse YAML frontmatter — ${err.message}`)
      continue
    }

    if (!frontmatter) {
      errors.push(`${relPath}: missing or malformed YAML frontmatter`)
      continue
    }

    const { name, description } = frontmatter

    if (!name) {
      errors.push(`${relPath}: missing required field 'name'`)
    } else if (name !== skillName) {
      errors.push(
        `${relPath}: name '${name}' must match directory '${skillName}'`,
      )
    }

    if (!description) {
      errors.push(`${relPath}: missing required field 'description'`)
    } else if (description.length < MIN_DESCRIPTION_LENGTH) {
      errors.push(
        `${relPath}: description too short (${description.length} chars) — make it descriptive enough to trigger correctly`,
      )
    }
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`::error::${error}`)
    }
    process.exit(1)
  }

  console.log(`✓ ${entries.length} skill(s) validated`)
}

main()
