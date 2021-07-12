# Data Engineer Project - Radiology Report

Radiology report project, Basic Data Engineering by PSU

## Gated-Blood pool study

## Extract GBP study from hospital DB

```sql
SELECT
  StudyKey,
  PID AS HN,
  Modality,
  Bodypart,
  InsertDate,
  ReportDoctor,
  VerifyDoctor,
  Report
FROM
  TStudyTab
WHERE
  Modality = 'NM'
  AND ( Report LIKE 'GATED BLOOD POOL%' OR Report LIKE 'MUGA scan%' )
ORDER BY
  InsertDate DESC
```

## To-do list

- [x] Extract LVEF data from report
- [x] Remove signature in the bottom of report
- [x] Detect & exclude LVEF value from previous study
- [x] Unit test extract from report, 100 samples
- [ ] Design relational database, normalization, ER diagram
- [ ] Receive data -> write to Postgres
- [ ] HN - Gen HN Map table
- [ ] Write mock data, 1 year of GBP study
- [ ] Load test, wrk
- [ ] ETL flow
- [ ] DAG, Deployment DAG
- [ ] Airflow schedule
- [ ] Monitor Airflow servies
- [ ] Presentation
- [ ] Postgres DB Model association

## Limitation

- บาง report พิมพ์ผิด ใน findings กับ impression ไม่ตรงกัน จะถูก exclude, (null result)
