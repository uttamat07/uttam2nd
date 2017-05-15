package com.ibm.cio.gppr.uuid;

public class UUID {
	public static Object randomUUID() {
		final com.eaio.uuid.UUID uuid = new com.eaio.uuid.UUID();
		return uuid;
	}
}

