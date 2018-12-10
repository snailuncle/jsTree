console.show()
男人='亚当'
女人='夏娃'
r=util.format("我叫%s,她叫%s", 男人,女人)
log(r)

人类={
  "男人":'亚当',
  "女人":'夏娃'
}
r=util.format("我叫%s,她叫%s", 人类.男人,人类.女人)
log(r)
r=util.format("人类=%j", 人类)
log(r)
