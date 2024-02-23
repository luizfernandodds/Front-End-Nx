package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JourneyDriverParameterDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private JourneyDriverDto journeyDriver;
	private LocalDateTime dateJourney;
    private Date initJourney;
	private Date endJourney;
	private Date serviceTime;
	private String initDirection;
	private String endDirection;
	private String timeDirection;
	private Date dayTime;
	private Date overtime;
	private Date overtime50;
	private Date overtime100;
	private Date overtimeNight;
	private Date overtimeNight50;
	private Date overtimeNight100;
	private Date restTime;
	private Date mealTime;
	private Date waitingTime;
	private Date waitingTimeOutsidService;
	private Date interJourney;
	private String targets;
	private String dateWithNameDayWeek;	
	private Date lastDateMoving;
	private Long timeDiff;
	private Date start;
	private Date finish;

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
		JourneyDriverParameterDto other = (JourneyDriverParameterDto) obj;
		return Objects.equals(id, other.id);
	}
	


}