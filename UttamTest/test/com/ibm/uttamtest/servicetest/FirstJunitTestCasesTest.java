package com.ibm.uttamtest.servicetest;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.ibm.uttamtest.service.FirstJunitTestCases;
import com.ibm.uttamtest.service.FirstListTestCases;

public class FirstJunitTestCasesTest {

	
	@Test
	public void test_FirstTestCases(){
		FirstJunitTestCases tc=new FirstJunitTestCases();
		tc.setName("uttam");
		tc.setDesc("coder");
		//assertEquals("uttam", tc.getName());
		assertEquals("uttam", tc.getName());
		assertEquals("uttam1", tc.getName());
		System.out.println("failre ");
	}
	@Test
	public void test_listTest(){
		FirstListTestCases ltc=new FirstListTestCases();
		List<String> ls=new ArrayList<String>();
		ls.add("uttam");
		ls.add("subrata");
		assertEquals(ls, ltc.listTest());
		System.out.println("sucessfull first test cases.");
		
		
	}
}
