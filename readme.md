## PSQL Migration Action

## Inputs

        env:
          PGUSER: ${{ secrets.PGUSER }}
          PGHOST: ${{ secrets.PGHOST }}
          PGPASSWORD: ${{ secrets.PGPASSWORD }}
          PGDATABASE: ${{ secrets.PGDATABASE }}
          PGPORT: 5432
          SCHEMA_SCRIPT: ${{steps.download-schema.outputs.download-path}}/schema.sql
          SEED_SCRIPT: ${{steps.download-seed.outputs.download-path}}/seed.sql


Required:

GitHub "Environments"

- Create environments ( dev, test, stag, prod )
  - Create PG.. secrets in each environment repectively
  - Now the plugin can remain unchanged and pull different secrets based on environments

- Set environment in action for each respectively
- Let dynamic secrets do their thing

