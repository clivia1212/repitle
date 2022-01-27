## 任务：

1.爬取下多个市的土地出让数据; 

2.目标网址：https://m.landchina.com/sellNotice/details?id=7b870b74-0e17-4b4b-9350-d9500698f400 

3.需爬取四个网页，需要的内容是：编号、用地名称、位置、面积、价值、出让年限、所属公司


## 分析

1. https://api.landchina.com/tGygg/transfer/list

    {"pageNum":1,"pageSize":10,"xzqDm":"","ggLx":"","landUsage":"","startDate":"","endDate":"","gyggBt":""}

  获取列表

2. 获取详情

  https://api.landchina.com/tGygg/transfer/detail

  {"gyggGuid":"4bff6053-a807-41ce-91ac-326469234b5a"}

  返回

  res.data.gyggNr 表格html

3. 解析table html forEach table

  由于格式固定 没有class 直接用 tr td index

  编号:  tr[0]td[1]
  用地名称: tr[6]td[0]
  位置: tr[0]td[5]
  面积: tr[6]td[1]
  价值: tr[7]td[3]
  出让年限: tr[1]td[1]

  4. 问题

  接口请求回来的数据跟网页上的不一致？？




绍兴市 city
22 ggLx
新昌县自然资源和规划局国有建设用地使用权拍卖出让公告(新自然告字〔2021〕17号) gyggBt
新昌县 xzqDm

  