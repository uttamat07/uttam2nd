package com.ibm.uttamtest.servicetest;

import static org.junit.Assert.*;

import org.junit.Test;

import com.ibm.uttamtest.service.FirstJunit;


public class FirstJunitTest {

	String message="My first junit test";
	FirstJunit firstJunit=new FirstJunit(message);
	@Test
	   public void testPrintMessage() {
	      assertEquals(message,firstJunit.printMessage());
	      System.out.println("test success");
	   }
}
