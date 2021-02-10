## PSQL Migration Action

## Inputs

        env:
          PGUSER: admin...
          PGHOST: database.name...
          PGPASSWORD: password...
          PGDATABASE: db...
          PGPORT: 5432
          SCHEMA_SCRIPT: "select * from ..."
          SEED_SCRIPT: "select * from ..."


Suggested:
- inputs are secret.. ${{ secret.... }}

