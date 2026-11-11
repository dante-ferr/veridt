export class Config {
  constructor(
    readonly databaseUrl: string,
    readonly jwksUrl: string,
    readonly issuer: string,
    readonly audience: string,
  ) {}

  static read(): Config {
    return new Config(
      required('DATABASE_URL'),
      required('JWKS_URL'),
      process.env.JWT_ISSUER ?? 'veridt-identity',
      process.env.JWT_AUDIENCE ?? 'veridt',
    )
  }
}

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    console.error(JSON.stringify({ msg: 'missing_config', key: name }))
    process.exit(1)
  }
  return value
}
