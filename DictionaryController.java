package com.free.controller;

import com.alibaba.fastjson.JSON;
import com.free.pojo.Pager;
import com.free.service.DictionaryService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DictionaryController {
	@Autowired
	@Qualifier("dictionaryService")
	private DictionaryService dictionaryService;

	@RequestMapping(value = { "/dylist.do" }, method = {
			org.springframework.web.bind.annotation.RequestMethod.POST }, produces = {
					"application/json;charset=utf-8" })
	@ResponseBody
	public Object method1(@ModelAttribute Pager pager) {
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("dytype", pager.getDytype());
		map.put("dykey", pager.getDykey());
		map.put("dyvalue", pager.getDyvalue());

		int count = this.dictionaryService.getCount(map);
		int size = pager.getSize().intValue();
		pager.setPage(Integer.valueOf(count % size == 0 ? count / size : count / size + 1));
		pager.setCount(Integer.valueOf(count));
		map.put("start", Integer.valueOf((pager.getIndex().intValue() - 1) * size));
		map.put("size", Integer.valueOf(size));
		pager.setDylist(this.dictionaryService.getDyList(map));
		return JSON.toJSONString(pager);
	}

	@RequestMapping(value = { "/onedy.do" }, method = {
			org.springframework.web.bind.annotation.RequestMethod.POST }, produces = {
					"application/json;charset=utf-8" })
	@ResponseBody
	public Object method2(@RequestParam("dyid") int id) {
		return JSON.toJSONString(this.dictionaryService.findById(id));
	}

	@RequestMapping(value = { "/tdeldy.do" }, method = {
			org.springframework.web.bind.annotation.RequestMethod.POST }, produces = {
					"application/json;charset=utf-8" })
	@ResponseBody
	public Object method3(@RequestParam("dyid") int id) {
		return JSON.toJSONString(Integer.valueOf(this.dictionaryService.delById(id)));
	}
}
