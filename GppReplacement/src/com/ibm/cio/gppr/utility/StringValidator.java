package com.ibm.cio.gppr.utility;

/**
 * @sunishuk
 * 
 */

import java.io.*;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringValidator
{

    private StringValidator()
    {
    }

    public static boolean isEmpty(String pString)
    {
        boolean isEmpty = false;
        if(pString == null || pString.trim().length() < 1)
            isEmpty = true;
        return isEmpty;
    }

    public static String replaceSpacesWith_(String pString)
    {
        String returnVal = pString;
        if(!isEmpty(pString))
        {
            int len = pString.length();
            char charArray[] = new char[len];
            for(int idx = 0; idx < len; idx++)
            {
                char tempChar = pString.charAt(idx);
                if(tempChar == ' ')
                    charArray[idx] = '_';
                else
                    charArray[idx] = tempChar;
            }

            returnVal = new String(charArray);
        }
        return returnVal;
    }

    public static String replaceCommaWith_(String pString)
    {
        String returnVal = pString;
        if(!isEmpty(pString))
        {
            int len = pString.length();
            char charArray[] = new char[len];
            for(int idx = 0; idx < len; idx++)
            {
                char tempChar = pString.charAt(idx);
                if(tempChar == ',')
                    charArray[idx] = '_';
                else
                    charArray[idx] = tempChar;
            }

            returnVal = new String(charArray);
        }
        return returnVal;
    }

    public static String appendIndex(String pString, int pIdx)
    {
        String returnVal = null;
        if(!isEmpty(pString))
        {
            StringBuffer sb = new StringBuffer(pString);
            sb.append(" : ");
            sb.append(pIdx);
            returnVal = sb.toString();
        }
        return returnVal;
    }

    public static String prependIndex(String pString, int pIdx)
    {
        String returnVal = null;
        if(!isEmpty(pString))
        {
            String indexString = Integer.toString(pIdx);
            StringBuffer sb = new StringBuffer(indexString);
            sb.append(" : ");
            sb.append(pString);
            returnVal = sb.toString();
        }
        return returnVal;
    }

    public static String[] buildArrayOfStrings(String pIds)
    {
        String vos[] = (String[])null;
        if(pIds != null)
        {
            StringTokenizer st = new StringTokenizer(pIds, ",");
            if(st.countTokens() > 0)
            {
                vos = new String[st.countTokens()];
                for(int i = 0; st.hasMoreTokens(); i++)
                    vos[i] = st.nextToken().trim();

            }
        }
        return vos;
    }

    public static String removeHTMLComment(String pString)
    {
        if(pString == null)
            return null;
        if(pString.indexOf("<!--") == -1)
            return pString;
        for(; pString.indexOf("<!--") != -1; pString = removeHTMLCommentRecurse(pString));
        return pString;
    }

    public static boolean isNullorEmpty(String pStr)
    {
        return pStr == null || "".equals(pStr.trim()) || pStr.trim().length() < 1 || "null".equalsIgnoreCase(pStr.trim());
    }

    private static String removeHTMLCommentRecurse(String pString)
    {
        if(pString.indexOf("<!--") != -1)
        {
            int startCommentIndex = pString.indexOf("<!--");
            if(pString.substring(startCommentIndex).indexOf("-->") != -1)
            {
                int endCommentIndex = startCommentIndex + pString.substring(startCommentIndex).indexOf("-->");
                if(startCommentIndex == 0)
                {
                    pString = pString.substring(endCommentIndex + 3);
                } else
                {
                    String temp = "";
                    temp = pString.substring(0, startCommentIndex);
                    temp = (new StringBuilder(String.valueOf(temp))).append(pString.substring(endCommentIndex + 3)).toString();
                    pString = temp;
                }
            } else
            {
                pString = pString.substring(0, startCommentIndex);
            }
        }
        return pString;
    }

    public static boolean isValidEmailString(String pEmail)
    {
        Pattern p = Pattern.compile("^[\\w_\\-%\\.]+@[\\w_\\-%\\.]+\\.[a-zA-Z]{2,6}$");
        Matcher m = p.matcher(pEmail);
        return m.matches();
    }

    public static String convertStreamToString(InputStream is)
        throws IOException
    {
        BufferedReader reader = null;
        StringBuffer sb = null;
        String line = null;
        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        sb = new StringBuffer();
        while((line = reader.readLine()) != null) 
            sb.append(line).append(EOL);
        is.close();
        return sb.toString();
    }

    public static String addCDataToXMLTag(String pXML, String pTag)
    {
        String group = null;
        Pattern p = null;
        Matcher m = null;
        StringBuffer replacement = null;
        StringBuffer xml = null;
        StringBuffer patternBuffer = new StringBuffer();
        patternBuffer.append("<").append(pTag);
        patternBuffer.append("[^>]*>(.*?)</");
        patternBuffer.append(pTag).append(">");
        p = Pattern.compile(patternBuffer.toString(), 2);
        m = p.matcher(pXML);
        replacement = null;
        xml = new StringBuffer();
        while(m.find()) 
        {
            group = m.group();
            if(group.indexOf("<![CDATA[") == -1)
            {
                replacement = new StringBuffer(group);
                replacement.insert(replacement.indexOf(">") + 1, "<![CDATA[");
                replacement.insert(replacement.indexOf("</"), "]]>");
                m.appendReplacement(xml, replacement.toString());
            }
        }
        m.appendTail(xml);
        return xml.toString();
    }

    public static String getXMLNodeValue(String xml, String tagName)
    {
        String group = null;
        Pattern p = null;
        Matcher m = null;
        if(xml == null)
            return null;
        StringBuffer patternBuffer = new StringBuffer();
        patternBuffer.append("(?m)(?s)(?i)<");
        patternBuffer.append(tagName);
        patternBuffer.append("[^>]*>(.*?)</");
        patternBuffer.append(tagName);
        patternBuffer.append(">");
        p = Pattern.compile(patternBuffer.toString(), 2);
        m = p.matcher(xml);
        if(m.find())
        {
            group = m.group();
            group = group.replace("<![CDATA[", "");
            group = group.replace("]]>", "");
            return group.substring(group.indexOf(">") + 1, group.lastIndexOf("</")).trim();
        } else
        {
            return null;
        }
    }

    public static String[] getStringArrayFromCommaSeperatedString(String pCommanSeperatedString)
    {
        String stringArray[] = (String[])null;
        stringArray = pCommanSeperatedString.split(",");
        return stringArray;
    }

    public static String[] getStringArrayFromString(String pCommanSeperatedString, String pSeperator)
    {
        String stringArray[] = (String[])null;
        stringArray = pCommanSeperatedString.split(pSeperator);
        return stringArray;
    }

    public static final String EOL = System.getProperty("line.separator");
    public static final String FILE_SAPARATOR = System.getProperty("file.separator");
    public static final String EMPTY_STRING = "";
    public static final char QUOTE = 34;
    public static final String SINGLE_QUOTE = "'";
    public static final char SPACE = 32;
    public static final char UNDERSCORE = 95;
    public static final char TAB = 9;
    public static final char CARRIAGE_RETURN = 13;
    public static final char COLON = 58;
    public static final char LESS_THEN_CHARACTER = 60;
    public static final char GT_THEN_CHARACTER = 62;
    public static final String HTML_COMMENT_START = "<!--";
    public static final String HTML_COMMENT_END = "-->";
    public static final char COMMA = 44;
    public static final char LEFT_PAREN = 40;
    public static final char RIGHT_PAREN = 41;
    public static final char LINEFEED = 10;
    public static final char PERIOD = 46;
    public static final char EXCLAMATION = 33;
    public static final char QUESTIONMARK = 63;
    public static final char FEED = 12;
    public static final char DASH = 45;
    public static final char SEMICOLON = 59;

}