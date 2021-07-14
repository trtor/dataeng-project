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
- [x] Design relational database, normalization,
- [x] Receive data -> write to Postgres
- [x] HN - Gen HN Map table
- [x] Write mock data, 1 year of GBP study
- [x] Alter DB -> add extract_ef column
- [ ] ER diagram
- [ ] Load test, wrk
- [ ] ETL flow
- [ ] DAG, Deployment DAG
- [ ] Airflow schedule
- [ ] Monitor Airflow servies
- [ ] Presentation
- [ ] Postgres DB Model association

## Limitation

- บาง report พิมพ์ผิด ใน findings กับ impression ไม่ตรงกัน จะถูก exclude, (null result)
- ไม่รับ Feature update หากจะ insert ซ้ำ
- No timezone in insert pg = GMT +7
- ยังไม่ทำ Postgres database association (foreign key) เพราะใช้ Sequelize library ยังไม่ถนัด

## Criteria

เกณฑ์คะแนนโครงงาน 45 คะแนน

1. **Cleansing** 10 คะแนน
   1.1 ใช้เทคนิค data cleansing เทคนิคที่ 1 - 5 คะแนน
   1.2 ใช้เทคนิค data cleansing เทคนิคที่ 2 - 5 คะแนน
2. **Database/data warehouse / management** 10 คะแนน  
   2.1 ให้เหตุผลได้เหมาะสมว่าในโครงงานตนเองนั้นเลือกใช้ Database แบบ Relational หรือ Non-Relational เพราะเหตุใด และออกแบบวิธีการจัดเก็บข้อมูลดิบที่ประมวลผลแล้วลงใน Database ในรูปแบบที่เลือกได้ - 5 คะแนน  
   2.2 นำข้อมูลที่จัดเก็บแล้ว Query ออกมาแสดงผลได้อย่างถูกต้องเหมาะสม
   หรือแสดงนำข้อมูลที่จัดเก็บแล้วเข้าสู่ระบบ Power BI ได้ - 5 คะแนน
3. **ETL flow** 10 คะแนน
   3.1 ออกแบบ/เขียน process ของ ETL (DAG) - 3 คะแนน
   3.2 สร้าง schedule ใน Airflow และ deploy DAG ได้ - 4 คะแนน
   3.3 บริหารจัดการ/monitor ผ่าน Airflow ได้ - 3 คะแนน
4. **Presentation/submission** 10 คะแนน
5. **Questions** 5 คะแนน
