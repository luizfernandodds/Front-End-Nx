package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JourneyTargetDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private TargetDto target;
	private Date datePosition;
	private Date dateOnly;
	private String dateOnlyString;
	private Long deviceId;
	private Boolean ignition;
	private Date start;
	private Date finish;
	private Date startChart;
	private Date finishChart;	
	private String statusPosition;
	private String wkt;
	private Long speed;
	private String address;
	private Long timeDiff;
	private String timeDiffFormated;
	private SimpleDateFormat formatter;
	private SimpleDateFormat formatterDatabase;
	private SimpleDateFormat formatterH;

	public JourneyTargetDto() {
		this.formatterDatabase = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		this.formatterH = new SimpleDateFormat("HH:mm:ss");
	}

	public void setDeviceId(Long deviceId) {
		this.deviceId = (deviceId != null ? Long.valueOf(deviceId.longValue()) : null);
	}

	public void setStart(Date start) {
		this.start = start;

		if ((this.timeDiff == null) && (this.finish != null) && (this.start != null))
			this.timeDiff = Long.valueOf(this.finish.getTime() - this.start.getTime());

	}

	public String getFormatStart() {
		if (this.start == null)
			return "";
		return this.formatter.format(this.start);
	}

	public void setFinish(Date finish) {
		this.finish = finish;

		if ((this.timeDiff == null) && (this.finish != null) && (this.start != null))
			this.timeDiff = Long.valueOf(this.finish.getTime() - this.start.getTime());
	}

	public String getFormatFinish() {
		if (this.finish == null)
			return "";
		return this.formatter.format(this.finish);
	}

	public String getFormatStartChart() {
		if (this.start == null)
			return "";
		return this.formatterDatabase.format(this.start);
	}

	public String getFormatFinishChart() {
		if (this.finish == null)
			return "";
		return this.formatterDatabase.format(this.finish);
	}

//	public String getFormatTimeDiffF() {
//		return DateUtilConverter.convertMilisecondInHours(this.timeDiff);
//	}

	public String getTimeDiffFormated() {
		if (this.timeDiff != null && this.timeDiff > 0) {
			this.timeDiffFormated = formatterH.format(timeDiff);
		}
		return timeDiffFormated;
	}
}