package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class EventFiredDto implements Serializable {

	
	private static final long serialVersionUID = 7851616814822577570L;
	private Long id;
	private DeviceDto device;
	private Date beginDate;
	private Date endDate;
	private Long event;
	private String eventName;
	private Double latitudeBegin;
	private Double longitudeBegin;
	private String addressBegin;
	private String countryBegin;
	private String cityBegin;
	private String stateBegin;
	private Double latitudeEnd;
	private Double longitudeEnd;
	private String addressEnd;
	private String countryEnd;
	private String cityEnd;
	private String stateEnd;
	private Timestamp time;
	private DriverDto driver;
	private EventTypeDto eventType;
	private Boolean ignition;
	private Boolean panic;
	private Boolean block;
	private Integer speed;
	private Date dateTreatment;
	private Integer speedEnd;
	private Boolean treatmentAutomatic = false;
	private Boolean centralTreatment = false;
	private Integer antitheft;
	private Long idTrip;
	private String coordinates;
	private String timeEvent;
	private Long journeyId;
	private Long eventIdBegin;
	private Long eventIdEnd;
	private String tag;
	private Long eventTravelId;
	private ControlPointDto controlPoint;

	public EventFiredDto() {
	}

	public String getTimeEvent() {
		Long timeMillis = 0L;

		if (this.endDate != null) {
			if (this.endDate.getTime() > 0) {
				timeMillis = (this.endDate.getTime() - this.beginDate.getTime());
			}
		}
		if (timeMillis > 0L) {
//			this.timeEvent = DateUtilConverter.convertMilisecondInHours(timeMillis);
		} else {
			this.timeEvent = "00:00:00";
		}

		return this.timeEvent;
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
		EventFiredDto other = (EventFiredDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}