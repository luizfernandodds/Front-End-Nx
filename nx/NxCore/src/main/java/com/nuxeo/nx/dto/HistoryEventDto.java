package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class HistoryEventDto implements Serializable {

	private static final long serialVersionUID = -6665560674372850695L;
	private Long id;
	private String answerable;
	private Timestamp create;
	private LocalDateTime dateGps;
	private LocalDateTime dateWithoutMarks;
	private String equipamentModel;
	private double lastPositionLat;
	private double lastPositionLng;
	private String local;
	private String situation;
	private int speed;
	private String treatedby;
	private Long deviceId;
	private Long driverId;
	private Long eventFiredId;
	private Long loginId;
	private Long targetId;
	private String observation;
	private AttendanceSituationDto attendanceSituation;
	private String justification;
	private String state;
	private String city;
	private String country;
	private String eventName;
	
	public HistoryEventDto() {
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HistoryEventDto other = (HistoryEventDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}