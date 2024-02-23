package com.nuxeo.nx.utils;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

/**
 * Date class utilities
 * 
 */
public class DateUtilConverter {

	/**
	 * Convert ISO format string (yyyy-MM-ddTHH:mm:ss) in {@link Date}
	 * 
	 * @param dateString
	 *            formtat yyyy-MM-ddTHH:mm:ss (T is a character 'T')
	 * @return Date
	 * @throws ParseException
	 */
	public static Date convertDateIso(String dateString) throws ParseException {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		return (Date) formatter.parse(dateString);

	}

	public static Date convertDateIsoReport(String dateString) throws ParseException {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		return (Date) formatter.parse(dateString);

	}
	
	/**
	 * Convert ISO format string (yyyy-MM-ddTHH:mm:ssZ) in {@link Date}
	 * <p>
	 * Example: <blockquote><code>2012-05-21T23:45:23-0300</code></blockquote>
	 * 
	 * @param dateString
	 *            formtat yyyy-MM-ddTHH:mm:ssZ (T is a character 'T')
	 * @return Date
	 * @throws ParseException
	 */
	public static Date convertDateIsoTz(String dateString) throws ParseException {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");

		return (Date) formatter.parse(dateString);
	}

	/**
	 * Convert string to ISO format (yyyy-MM-ddTHH:mm:ss) in {@link Date}
	 * <p>
	 * Example: <blockquote><code>2012-05-21T23:45:23-0300</code></blockquote>
	 * 
	 * @param Date
	 * @return dateString formtat yyyy-MM-ddTHH:mm:ss (T is a character 'T')
	 * @throws ParseException
	 */
	public static String convertDateIsoTz(Date date) throws ParseException {

		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		return (String) formatter.format(date);
	}

	/**
	 * Convert miliseconds in h24:mm:ss
	 * <p>
	 * 
	 * @param long
	 * @return String
	 */
	public static String convertMilisecondInHours(Long timeMillis) {
		String retorno = "";
		long time = timeMillis / 1000;
		
		long seconds = (time % 60);
		long minutes = (time % 3600) / 60;
		long hours = (time / 3600);

		DecimalFormat decimalFormat = new DecimalFormat("00");

		retorno += decimalFormat.format(hours) + ":";
		retorno += decimalFormat.format(minutes) + ":";
		retorno += decimalFormat.format(seconds);

		return retorno;
	}

	public static String convertMilisecondInHoursMinute(Long timeMillis) {
		String retorno = "";
		long time = timeMillis / 1000;
		
		long seconds = (time % 60);
		long minutes = (time % 3600) / 60;
		long hours = (time / 3600);

		DecimalFormat decimalFormat = new DecimalFormat("00");

		retorno += decimalFormat.format(hours) + ":";
		retorno += decimalFormat.format(minutes);

		return retorno;
	}
	/**
	 * Convert miliseconds in h24:mm:ss
	 * <p>
	 * 
	 * @param long
	 * @return String
	 */
	public static long convertHourInMilisecond(double hour) {
		long timeMillis = (long) (hour * 3600000);

		return timeMillis;
	}

	/**
	 * Check if da String date is a valid date
	 * <p>
	 * 
	 * @param String
	 *            String
	 * @return boolean
	 */
	public static boolean isValidDate(String dateToValidate, String dateFromat) {
		if (dateToValidate == null) {
			return false;
		}

		SimpleDateFormat sdf = new SimpleDateFormat(dateFromat);
		sdf.setLenient(false);

		try {
			sdf.parse(dateToValidate);
		} catch (ParseException e) {
			return false;
		}

		return true;
	}

	/**
	 * Returns the date in format: <tt>dd/MM/yyyy HH:mm:ss</tt>
	 * 
	 * @param date
	 * @return <tt>dd/MM/yyyy HH:mm:ss</tt> string or <tt>null</tt> if the
	 *         conversion is impossible.
	 */
	public static String formatDate(Date date) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		try {
			return (String) formatter.format(date);
		} catch (Exception e) {
			return null;
		}

	}

	/**
	 * Returns the date with time zone added
	 * 
	 * @param date
	 * @param timeZone
	 *            in minutes
	 * @return
	 */
	public static Date convertTimeZone(Date date, int timeZone) {
		return new Date(date.getTime() + (timeZone * 60 * 1000));
	}

	public static Date convertTimeZoneAddMillissecond(Date date, int timeZone, int addMillisecond) {
		return new Date(date.getTime() + (timeZone * 60 * 1000) + addMillisecond);
	}
	
	public static String formatDateTimezone(Date date, int timeZone) {
		Date newDate = new Date(date.getTime() + (timeZone * 60 * 1000));
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		try {
			return (String) formatter.format(newDate);
		} catch (Exception e) {
			return null;
		}

	}
	public static String convertTimeZoneDateOnly(Object obj, int timeZone) {
		
		Date date = (Date) obj;
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");

		return (String) formatter.format(new Date(date.getTime() + (timeZone * 60 * 1000)));

	}
	
	public static String convertTimeZoneDateOnlyDate(Date date, int timeZone) {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");

		return (String) formatter.format(new Date(date.getTime() + (timeZone * 60 * 1000)));

	}
	
	public static String convertTimeZoneDateObj(Object obj, int timeZone) {
		
		Date date = (Date) obj;
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		return (String) formatter.format(new Date(date.getTime() + (timeZone * 60 * 1000)));

	}
	
	public static String convertTimeZoneDate(Object obj, int timeZone, boolean dateTime ) {
		
		Date date = (Date) obj;
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		return (String) formatter.format(new Date(date.getTime() + (timeZone * 60 * 1000)));

	}
	public static Date convertTimeZoneDate(Object obj, int timeZone) throws ParseException {
		
		Date date = (Date) obj;
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd");
		
		return  formatter.parse(formatter.format(date.getTime() + (timeZone * 60 * 1000)));

	}
	
	/**
	 * Returns the date formated with time zone added
	 * 
	 * @param date
	 * @return
	 */
	public static Date formatDateTimeZone(Object aux, Integer timeZone) {
		Calendar calendar = new GregorianCalendar();
		Date date = null;

		calendar.setTime((Date) aux);
		calendar.add(Calendar.HOUR_OF_DAY, timeZone);

		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

		try {
			date = (Date) formatter.parse(formatter.format(calendar.getTime()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return date;
	}

	/**
	 * Returns the date with time zone added
	 * 
	 * @param date
	 * @param timeZone
	 *            in minutes
	 * @return
	 */
	public static Date convertTimeZoneHour(Date date, int timeZone) {
		return new Date(date.getTime() + (timeZone * 60 * 60 * 1000));
	}

	/**
	 * Returns the today date with zero hour with time zone
	 * 
	 * @param date
	 * @param timeZone
	 *            in minutes
	 * @return
	 */
	public static Date getNowDateTimeZone(int timeZone) {
		return new Date((new Date()).getTime() + (timeZone * 60 * 60 * 1000));
	}
	
	public static Date getNowDateNotTimeZone() {
		return new Date((new Date()).getTime());
	}

	/**
	 * Returns the today date with zero hour with time zone
	 * 
	 * @param date
	 * @param timeZone
	 *            in minutes
	 * @return
	 */
	public static Date getTodayDateZeroHour(int timeZone) {
		Calendar cal = Calendar.getInstance();
		Date date = new Date((new Date()).getTime() + (timeZone * 60 * 60 * 1000));
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}

	/**
	 * Returns the today date with last hour with time zone
	 * 
	 * @param date
	 * @param timeZone
	 *            in minutes
	 * @return
	 */
	public static Date getTodayLastHour(int timeZone) {
		Calendar cal = Calendar.getInstance();
		Date date = new Date((new Date()).getTime() + (timeZone * 60 * 60 * 1000));
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}

	public static Date convertDate(String dateString) throws ParseException {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		return formatter.parse(dateString);
	}

	public static String convertDateToChart(String dateString) {
		SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
		Date data;

		try {
			data = formato.parse(dateString);
			formato.applyPattern("dd/MM/yyyy");
			String dataFormatada = formato.format(data);

			return dataFormatada;
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String convertToDateUTC(String dateString) {
		SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date data;
		StringBuilder str = new StringBuilder();
		StringBuilder aux = new StringBuilder();
		try {
			data = formato.parse(dateString);
			formato.applyPattern("yyyy, MM, dd, hh, mm, ss");
			String dataFormatada = formato.format(data);
			String array[] = dataFormatada.split(",");
			
			aux.append(array[0]).append(",")
			.append(array[1]).append(",")
			.append("0").append(",")
			.append(array[3]).append(",")
			.append(array[4]).append(",")
			.append(array[5]);

			return str.append("Date.UTC(" + aux + ")").toString();
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return null;
	}
	
	public static String invertDateDatabaseToDate(String dateString) {
		String retorno = "";
		String[] dateSplit = null;
		if(dateString!=null && !"".equals(dateString)) {
			
			dateSplit = dateString.split("-");
			
			if(dateSplit!=null && dateSplit.length > 0) {
				if(dateSplit[2]!=null) {
					retorno = dateSplit[2]+"/";
				}
				if(dateSplit[1]!=null) {
					retorno += dateSplit[1]+"/";
				}
				if(dateSplit[0]!=null) {
					retorno += dateSplit[0];
				}
			}
		}
		return retorno;
	}
	
	public static String convertToDateUTCDatabase(String dateString) {
		SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date data;
		StringBuilder str = new StringBuilder();
		StringBuilder aux = new StringBuilder();
		
		try {
			data = formato.parse(dateString);
			
			formato.applyPattern("yyyy,MM,dd,HH,mm,ss");
			String dataFormatada = formato.format(data);
			String array[] = dataFormatada.split(",");
			
			aux.append("0").append(",")
			.append("0").append(",")
			.append("0").append(",")
			.append(array[3]).append(",")
			.append(array[4]).append(",")
			.append(array[5]);

			return str.append(aux).toString();
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String converterTimeZoneGMT(Integer timeZone) {
		String retorno="";
		if(timeZone !=null) {
			retorno = String.valueOf("GMT-0"+(timeZone * -1)+":00");
		}
		return retorno;
	}

	public static boolean isSunday(Date date) {
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		
		
        int dayWeek= cal.get(Calendar.DAY_OF_WEEK);

        if(dayWeek == Calendar.SUNDAY) {
        	return true;
        }
		return false;
	}
	
	public static boolean isSaturday(Date date) {
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		
		
        int dayWeek= cal.get(Calendar.DAY_OF_WEEK);

        if(dayWeek == Calendar.SATURDAY) {
        	return true;
        }
		return false;
	}

	public static boolean isSaturdayLd(LocalDate localDate) {
		DayOfWeek d = localDate.getDayOfWeek();
		return d == DayOfWeek.SATURDAY;
	}

	public static boolean isSundayLd(LocalDate localDate) {
		DayOfWeek d = localDate.getDayOfWeek();
		return d == DayOfWeek.SUNDAY;
	}

	public static String convertHourInDay(Integer hour) {
		
		String period = "";

		if(hour < 24) {
			period = hour +" h";
		}else {
			period = ((int) hour/24) +" dia(s)";
		}
		
		return period;
	}
	
	public static String formatDateStr(Date date) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("ddMMyyyy");

		try {
			return (String) formatter.format(date);
		} catch (Exception e) {
			return null;
		}

	}
	
	public static String addDayInDate(Date date, int day) {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("ddMMyyyy");

		Calendar c = Calendar.getInstance();
		c.setTime(date);

		if(day > 0) {
			c.add(Calendar.DAY_OF_MONTH, day);  
		}
		
		String newDate = formatter.format(c.getTime()); 
		return newDate;
	}
	
	public static String addDayInDateFormat2(Date date, int day) {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");

		Calendar c = Calendar.getInstance();
		c.setTime(date);

		if(day > 0) {
			c.add(Calendar.DAY_OF_MONTH, day);  
		}
		
		String newDate = formatter.format(c.getTime()); 
		return newDate;
	}
	
	public static String formatDateStrDb(Date date) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd");

		try {
			return (String) formatter.format(date);
		} catch (Exception e) {
			return null;
		}

	}
	
	public static String formatDateTimezoneDb(String dateString, Integer timeZone) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		try {
			Date date = (Date) formatter.parse(dateString);
			Date newDate = new Date(date.getTime() + (timeZone * 60 * 60 * 1000));

			return (String) formatter.format(newDate);
		} catch (Exception e) {
			return null;
		}

	}
	
	public static String formatDateTimezoneDbReport(String dateString, Integer timeZone) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		try {
			Date date = (Date) formatter.parse(dateString);
			Date newDate = new Date(date.getTime() + (timeZone * 60 * 60 * 1000));

			return (String) formatter.format(newDate);
		} catch (Exception e) {
			return null;
		}

	}
	
	public static String formatDateTimezoneIso(Date date, int timeZone) {
		Date newDate = new Date(date.getTime() + (timeZone * 60 * 60 * 1000));
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		try {
			return (String) formatter.format(newDate);
		} catch (Exception e) {
			return null;
		}

	}

	public static int getDayWeek(Date date) {

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

        int dayWeek= cal.get(Calendar.DAY_OF_WEEK);

		return dayWeek;
	}
	
	public static int getHour(Long time) {
		Date dateNow = new Date();
		Long result = 0L; 
		Long hours = 0L;
		if(time!=null && time > 0) {
			result = (dateNow.getTime() - time) / 1000;
			hours = (result / 3600);
		}

		if(hours > 0L) {
	        return Integer.parseInt(hours.toString());
		}

		return 0;
	}

	/**
	 * invert date dd/mm/yyyy HH:mm:ss TO yyyy-mm-ddTHH:mm:ss
	 * <p>
	 * 
	 * @param String
	 *            String
	 * @return String
	 */
	public static String invertDateToDateDatabase(String date) {
		String array[] = date.split(" ");
		StringBuilder sbd = new StringBuilder();

		if(array[0]!=null) {
			String arrayD[] = array[0].split("/");

			sbd.append(arrayD[2]);
			sbd.append("-");
			sbd.append(arrayD[1]);
			sbd.append("-");
			sbd.append(arrayD[0]);
			sbd.append("T");
			sbd.append(array[1]);
		}
		
		return sbd.toString();
	}
	
	
	public static Date convertDateToDatabase(String dateString) throws ParseException {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String array[] = dateString.split(" ");
		StringBuilder sbd = new StringBuilder();

		if(array[0]!=null) {
			String arrayD[] = array[0].split("/");

			sbd.append(arrayD[2]);
			sbd.append("-");
			sbd.append(arrayD[1]);
			sbd.append("-");
			sbd.append(arrayD[0]);
			sbd.append(" ");
			sbd.append(array[1]);
		}
		
		return formatter.parse(sbd.toString());
	}
	
	//format dateString 13/05/2022
	public static Date convertStringToDate(String dateString) throws ParseException {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd");

		StringBuilder sbd = new StringBuilder();

		if(dateString!=null && !dateString.isEmpty() ) {
			String arrayD[] = dateString.split("/");

			sbd.append(arrayD[2]);
			sbd.append("-");
			sbd.append(arrayD[1]);
			sbd.append("-");
			sbd.append(arrayD[0]);
		}
		
		return formatter.parse(sbd.toString());

	}
	
	public static String addDayInDateDatabase(String date, int day) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		Calendar c = Calendar.getInstance();
		
		Date newData;
		try {
			newData = convertDateIso(date);

			c.setTime(newData);

			if(day > 0) {
				c.add(Calendar.DAY_OF_MONTH, day);  
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		String newDateStr = formatter.format(c.getTime()); 
		return newDateStr;
	}
	
	
	public static Double getHourDecimal(Long time) {
		Date dateNow = new Date();
		Double result = 0D;
		Double hours = 0D;
		if (time != null && time > 0) {
			result = (double) ((dateNow.getTime() - time) / 1000);
			hours = (result / 3600);
		}
		 
		return Double.parseDouble(hours.toString());

	}

	public static String convertDateToIntegration(Date date) throws ParseException {
		DateFormat formatter;
		formatter = new SimpleDateFormat("ddMMyyyy HH:mm:ss");

		return (String) formatter.format(date);
	}
	
	public static String convertDateToIntegrationWithTimezone(Date date, int timeZone) throws ParseException {
		Date newDate = new Date(date.getTime() + (timeZone * 60 * 60 * 1000));
		DateFormat formatter;
		formatter = new SimpleDateFormat("ddMMyyyy HH:mm:ss");

		return (String) formatter.format(newDate);
	}
	
	public static Long convertDateToMilisseconds(String dateString) throws ParseException {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Date newDate = formatter.parse(dateString);
		
		return newDate.getTime();
	}
	
	public static Date formatDateTimezoneReport(String dateString, Integer timeZone) {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		try {
			Date date = (Date) formatter.parse(dateString);
			Date newDate = new Date(date.getTime() + (timeZone * 60 * 60 * 1000));

			Date dateReturn = convertDateIsoReport(formatter.format(newDate));
			
			return dateReturn;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public static String formatDateString(String dateString) {

		DateFormat formatter2;
		formatter2 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");


		try {
			
			Date date = (Date) formatter.parse(dateString);

			return (String) formatter2.format(date);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public static String formatDateStrReport(Date date) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");

		try {
			return (String) formatter.format(date);
		} catch (Exception e) {
			return null;
		}

	}

	//retirar timezone
	public static String formatDateStrReportTimezone(Date date, int timezone) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");
		try {
			
			Date newDate = new Date(date.getTime() + (timezone * 60 * 60 * 1000));
			
			return (String) formatter.format(newDate);
		} catch (Exception e) {
			return null;
		}
	}

	
	//input yyyy-MM-dd HH:mm:ss
	public static Date formatDateWithTimezone(String dateString, int timezone) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		try {
			Date date = sdf.parse(dateString);

			Date newDate = new Date(date.getTime() + (timezone * 60 * 60 * 1000));

			return newDate;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public static String getDayName(Date date) {
		
		SimpleDateFormat simpleDateformat = new SimpleDateFormat("EEEE");
       // System.out.println(simpleDateformat.format(date));
 
 	    return simpleDateformat.format(date);
	}
	
	public static String getDateAndDayName(Date date) {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");
		
		formatter.format(date);
		
        String retorno = formatter.format(date)+" \n"+getDayName(date);
 	    return retorno;
	}
	
	public static Long getTimeDateOnly(Date date) {
		Date todayWithZeroTime = null;
		try {
			DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

			todayWithZeroTime = formatter.parse(formatter.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return todayWithZeroTime.getTime();
	}

	//input yyyy-MM-dd HH:mm:ss
	public static String getHourAndMinute(Date date) {
	    Format f = new SimpleDateFormat("HH:mm:ss");
	    String strResult = f.format(date);

		return strResult;
	      
	}
	

	public static String subtractHour(String dateInit, String dateEnd) {
	    LocalTime horaInicio = LocalTime.parse(dateInit.trim());
	    LocalTime horaFim = LocalTime.parse(dateEnd.trim());

	    Duration diferenca = Duration.between(horaInicio, horaFim);
	    LocalTime localTimeDiferenca = LocalTime.ofNanoOfDay(diferenca.toNanos());

		return localTimeDiferenca.toString();
	      
	}

	
	public static String sumHour(String dateInit, String dateEnd) {
	    LocalTime horaInicio = LocalTime.parse(dateInit.trim());
	    LocalTime horaFim = LocalTime.parse(dateEnd.trim());

        LocalTime totalHour = horaInicio.plusHours(horaFim.getHour()).plusMinutes(horaFim.getMinute()).plusSeconds(horaFim.getSecond());
        
		return totalHour.toString();
	      
	}
	
	//HH:mm:ss - Converte em milisegundos
	public static Long convertHourInMilliseconds(String hour) {

		String[] tokens = hour.split(":");
		int secondsToMs = 0;
		if(tokens.length > 2) {
			secondsToMs = Integer.parseInt(tokens[2]) * 1000;
		}
		int minutesToMs = Integer.parseInt(tokens[1]) * 60000;
		int hoursToMs = Integer.parseInt(tokens[0]) * 3600000;
		long total = secondsToMs + minutesToMs + hoursToMs;
		
		return total;
	}
	
	//Date and String = "HH:mm:ss"
	public static Date dateInitHourNightJourney(Date date, String hour) {
		
		try {
			DateFormat formatter;
			formatter = new SimpleDateFormat("yyyy-MM-dd");

			DateFormat formatterRet;
			formatterRet = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			String strDate = formatter.format(date.getTime()) +" "+hour;
			
			return  formatterRet.parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return  null;
	}
	
	
	/**
	 * Returns the date
	 * 
	 * @param localtime HH:mm:ss
	 * @return
	 */
	public static Date convertLocalTimeToDate(LocalTime localTime) {
		//LocalTime initJourney = LocalTime.parse("04:20:33");
		
        Instant instant1 = localTime.atDate(LocalDate.of(2020, 8, 30)).
                atZone(ZoneId.systemDefault()).toInstant();
        Date time1 = Date.from(instant1);
		return time1;
	}

	/**
	 * Returns the date
	 * 
	 * @param localtime HH:mm:ss and Date
	 * @return
	 */
	public static Date convertLocalTimeToDateWithDate(LocalTime localTime, Date dateToConverter) {
		LocalDate ldate = DateUtilConverter.convertDateToLocalDate(dateToConverter);
		
        Instant instant1 = localTime.atDate(ldate).atZone(ZoneId.systemDefault()).toInstant();
        Date time1 = Date.from(instant1);
		return time1;
	}

	/**
	 * Returns the LocalTime HH:mm:ss
	 * 
	 * @param Date
	 * @return
	 */
	public static LocalTime convertDateToLocalTime(Date date) {
        Instant instant = Instant.ofEpochMilli(date.getTime());
        LocalTime res = LocalDateTime.ofInstant(instant, ZoneId.systemDefault()).toLocalTime();
        
		return res;
	}
	
	/**
	 * Returns the date
	 * 
	 * @param LocalDate
	 * @return
	 */
	public static Date convertLocalDateToDate(LocalDate localDate) {
        Instant instant = localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant();
        Date res = Date.from(instant);
        
		return res;
	}
	
	/**
	 * Returns the LocalDate
	 * 
	 * @param Date
	 * @return
	 */
	public static LocalDate convertDateToLocalDate(Date date) {
		Instant instant = Instant.ofEpochMilli(date.getTime());
		LocalDate res = LocalDateTime.ofInstant(instant, ZoneId.systemDefault()).toLocalDate();
        
		return res;
	}
	
	public static LocalTime subtractHourLocalTime(LocalTime horaInicio, LocalTime horaFim) {

	    Duration diferenca = Duration.between(horaInicio, horaFim);
	    LocalTime localTimeDiferenca = LocalTime.ofNanoOfDay(diferenca.toNanos());

		return localTimeDiferenca;
	      
	}
	
	public static LocalTime setConvertStringToLocalTime(String str) {
		LocalTime strLocalTime = LocalTime.parse(str);
		
		return strLocalTime;
	}
	
	public static Date convertDateMilisecondInDate(Long milisecond) {
       Date now = new Date(milisecond);

       return now;
	}
	
	public static Date convertStringRestToDate(String dateString) throws ParseException {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");

		StringBuilder sbd = new StringBuilder();

		if(dateString!=null && !dateString.isEmpty() ) {
			String arrayDateComplete[] = dateString.split(" ");
			
			if(arrayDateComplete[0]!=null) {
				String arrayD[] = arrayDateComplete[0].split("/");

				sbd.append(arrayD[2]);
				sbd.append("-");
				sbd.append(arrayD[1]);
				sbd.append("-");
				sbd.append(arrayD[0]);
				
				sbd.append(" ");
				sbd.append(arrayDateComplete[1]);
			}
		}
		
		return formatter.parse(sbd.toString());

	}
	
	public static Date convertStringRestToDateSec(String dateString) throws ParseException {
		
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		StringBuilder sbd = new StringBuilder();

		if(dateString!=null && !dateString.isEmpty() ) {
			String arrayDateComplete[] = dateString.split(" ");
			
			if(arrayDateComplete[0]!=null) {
				String arrayD[] = arrayDateComplete[0].split("/");

				sbd.append(arrayD[2]);
				sbd.append("-");
				sbd.append(arrayD[1]);
				sbd.append("-");
				sbd.append(arrayD[0]);
				
				sbd.append(" ");
				sbd.append(arrayDateComplete[1]);
			}
		}
		
		return formatter.parse(sbd.toString());

	}
	
	public static Date convertNotTimeZoneHour(Date date) {
		return new Date(date.getTime());
	}
	
    public static String getDurationBreakdown(long millis) {
        if(millis < 0) {
            throw new IllegalArgumentException("Duration must be greater than zero!");
        }

        long days = TimeUnit.MILLISECONDS.toDays(millis);
        millis -= TimeUnit.DAYS.toMillis(days);
        long hours = TimeUnit.MILLISECONDS.toHours(millis);
        millis -= TimeUnit.HOURS.toMillis(hours);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis);
        millis -= TimeUnit.MINUTES.toMillis(minutes);
        long seconds = TimeUnit.MILLISECONDS.toSeconds(millis);

        StringBuilder sb = new StringBuilder();
        if(days >0) {
            sb.append(days);
            sb.append(" Dia(s) ");
        }
        if(hours >0) {
            sb.append(hours);
            sb.append(" Hora(s) ");
        }
        sb.append(minutes);
        sb.append(" Minutos ");
//        sb.append(seconds);
//        sb.append(" Seconds");

        return sb.toString();
    }
    
    public static Date addMinutesToDate(int minutes, Date beforeTime){
        final long ONE_MINUTE_IN_MILLIS = 60000;//millisecs

        long curTimeInMs = beforeTime.getTime();
        Date afterAddingMins = new Date(curTimeInMs + (minutes * ONE_MINUTE_IN_MILLIS));
        return afterAddingMins;
    }
    
    public static Date subtractMinutesToDate(int minutes, Date beforeTime){
        final long ONE_MINUTE_IN_MILLIS = 60000;//millisecs

        long curTimeInMs = beforeTime.getTime();
        Date afterAddingMins = new Date(curTimeInMs - (minutes * ONE_MINUTE_IN_MILLIS));
        return afterAddingMins;
    }
    
    public static Long convertMilisecondInDateAndHours(Long timeMillis, long timezone) {
  	  LocalDate lt = LocalDate.now();
  	  
  	  final SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
  	  sdf.setTimeZone(TimeZone.getTimeZone("UTC"));  
  	  String hours = sdf.format(new Date(timeMillis));
  	
  	  String dateTime = lt.toString()+' '+hours;
  	  
  		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  		formatter.setTimeZone(TimeZone.getTimeZone("UTC"));  
  		Date newDate;
  		long dateTimeZone = 0;
  		try {
  			newDate = formatter.parse(dateTime);
  			dateTimeZone = newDate.getTime()+(timezone*3600000);
  		} catch (ParseException e) {
  			e.printStackTrace();
  		}
  		
  		
  	  return dateTimeZone;
  	  
    }
    
	public static boolean isSaturdayOrSunday(Date date) {
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		
		
        int dayWeek= cal.get(Calendar.DAY_OF_WEEK);

        if(dayWeek == Calendar.SATURDAY || dayWeek == Calendar.SUNDAY) {
        	return true;
        }
		return false;
	}
	
	public static String convertMilisecondToHours(Long timeMillis) {
		DateFormat df = new SimpleDateFormat("HH:mm:ss");
		String str = df.format(new Date(timeMillis));
		  
		return str;
		
	}
	
	public static String convertDateIso(Date date) throws ParseException {

		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		return (String) formatter.format(date);
	}
	
	
	//input yyyy-MM-dd
	public static Date convertStrToOnlyDate(String dateString) throws ParseException {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

		return formatter.parse(dateString);
	}

	//String recebida: yyyy-MM-dd
	//String retornada: dd/MM/yyyy
	public static String addDayInDateReport(String date, int day) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");
		Calendar c = Calendar.getInstance();
		
		Date newData;
		try {
			newData = convertDateIso(date);

			c.setTime(newData);

			if(day > 0) {
				c.add(Calendar.DAY_OF_MONTH, day);  
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		String newDateStr = formatter.format(c.getTime()); 
		return newDateStr;
	}
	
	//recebe date e int dia
	//String retornada: dd/MM/yyyy
	public static String formatDateStrReport(Date date, int day) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy");
		Calendar c = Calendar.getInstance();
		try {
			c.setTime(date);

			if(day > 0) {
				c.add(Calendar.DAY_OF_MONTH, day);  
			}
			
			return (String) formatter.format(date);
		} catch (Exception e) {
			return null;
		}

	}
	
	//recebe yyyy-MM-ddTHH:mm:ss
	public static String convertDateIsoAndAddDay(String dateString, int day) throws ParseException {
		DateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Calendar c = Calendar.getInstance();

		Date newData;
		try {
			newData = convertDateIso(dateString);

			c.setTime(newData);

			if(day > 0) {
				c.add(Calendar.DAY_OF_MONTH, day);  
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return (String) formatter.format(c.getTime());

	}
}