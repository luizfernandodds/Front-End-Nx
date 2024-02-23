package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class EventDto implements Serializable {


	
	// codigos especiais para eventos

	/** Database number for Panic Event */
	public static final long PANIC_EVENT = 1L;
	/** Database number for Block Event */
	public static final long BLOCK_EVENT = 2L;
	/** Database number for BATTERY Event */
	public static final long BATTERY_ALERT_EVENT = 3L;

	/**
	 * Automatic Event
	 * <ol>
	 * <li>Panic</li>
	 * <li>Block</li>
	 * </ol>
	 * 
	 * @see #PANIC_EVENT
	 * @see #BLOCK_EVENT
	 */
	public static final Long[] AUTOMATIC_EVENTS = { PANIC_EVENT, BLOCK_EVENT, BATTERY_ALERT_EVENT };

	private Long id;
	private EventTypeDto eventType;
	private CustomerDto customer;
	private String description;
	private String name;
	private String parameter;
	private Boolean active;
	private Boolean centralTreatment = false;
	private String action;
	private LoginDto login;
	private Date alterEvent;
	private Set<TargetDto> targets;
//	private Set<JourneyDto> journey;
	private Boolean eventJourney  = false;
	private Boolean eventJourneyEnd  = false;
	private Integer eventJourneyType = 0;
	private Long idTravelSchedule;
	private Boolean endPostOffice  = false;
	private Long idJourney;
	private Boolean eventNoPosition  = false;
	private Boolean eventOnlyOneTreatment  = false;
	private Integer eventWeight;
	private Long idMonitoringRequest;
	private Date dateDelete;
	private Integer idControl;
	private Long idExternal;
	
	public EventDto() {
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EventDto other = (EventDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}