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

- [ ] Remove signature in the bottom of report
- [ ] Extract LVEF data from report
- [ ] Detect & exclude LVEF value from previous study
- [ ] Load test, wrk
