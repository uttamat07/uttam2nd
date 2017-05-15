/**
 * IBM Confidential
 * 
 * Solutions Self Enablement Source Materials
 * 
 * 
 * (c) Copyright IBM Corp. 1999 - 2013
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 * 
 */
package com.ibm.cio.gppr.utility;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * This class provides utility methods related to date.
 * 
 * @author Harshini
 */
public class DateUtil {

	public static SimpleDateFormat defaultTimeStampFormat = new SimpleDateFormat(
			"MM/dd/yy hh:mm a");

	public static SimpleDateFormat defaultDateFormat = new SimpleDateFormat(
			"MM/dd/yy");

	public static SimpleDateFormat fullTimeStampFormat = new SimpleDateFormat(
			"MM-dd-yyyy hh:mm:ss a");

	public static SimpleDateFormat fullTimeStampFormat24 = new SimpleDateFormat(
			"MM/dd/yyyy HH:mm:ss");

	public static SimpleDateFormat reportTimeStampFormat = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public static String getDefaultUSTimeStampFormat(Long time) {
		if (time == null) {
			return "";
		}
		return getDefaultUSTimeStampFormat(new Date(time));
	}

	public static String getDefaultUSTimeStampFormat(Date date) {
		if (date == null) {
			return "";
		}

		try {
			return defaultTimeStampFormat.format(date);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getDefaultUSDateFormat(Long time) {
		if (time == null) {
			return "";
		}
		return getDefaultUSDateFormat(new Date(time));
	}

	public static String getDefaultUSDateFormat(Date date) {

		if (date == null) {
			return "";
		}

		try {
			return defaultDateFormat.format(date);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getFullUSTimeStampFormat(Long time) {
		if (time == null) {
			return "";
		}
		return getFullUSTimeStampFormat(new Date(time));
	}

	public static String getFullUSTimeStampFormat(Date date) {
		if (date == null) {
			return "";
		}

		try {
			return fullTimeStampFormat.format(date);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getFullUSTimeStampFormat24(Long time) {
		if (time == null) {
			return "";
		}
		return getFullUSTimeStampFormat24(new Date(time));
	}

	public static String getFullUSTimeStampFormat24(Date date) {
		if (date == null) {
			return "";
		}

		try {
			return fullTimeStampFormat24.format(date);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getReportTimeStampFormat(Long time) {
		if (time == null) {
			return "";
		}
		return getReportTimeStampFormat(new Date(time));
	}

	public static String getReportTimeStampFormat(Date date) {
		if (date == null) {
			return "";
		}

		try {
			return reportTimeStampFormat.format(date);
		} catch (Exception e) {
			return "";
		}
	}
}
