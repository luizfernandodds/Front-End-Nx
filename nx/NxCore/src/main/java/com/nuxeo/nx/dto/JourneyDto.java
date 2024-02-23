package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Objects;
import java.util.Set;

/**
 * The persistent class for the route database table.
 * 
 */
@ToString
@Getter
@Setter
public class JourneyDto implements Serializable{

	private static final long serialVersionUID = -5528150952062063788L;
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private String name;
	private String email;
	private String control;
	private LocalDateTime dateStart;
	private LocalDateTime dateend;
	private DriverDto driver;
	private TargetDto target;
	private ControlPointDto controlPointOrigin;
	private ControlPointDto controlPointDestination;
	private String shipment;
	private String charge;
	private Double chargeValue;
	private String numberNf;
	private String wkt;
	private String wktPoints;
	private String wktPocs;
	private String description;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private Set<EventDto> listEvent;
	private Boolean active = true;
	private Integer numberRomaneio;
	private Integer emptyLoaded;
	private String trailerPlate;
	private String startDateFormat;
	private String endDateFormat;
	private String chargeValueFormat;

	public JourneyDto() {
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
		JourneyDto other = (JourneyDto) obj;
		return Objects.equals(id, other.id);
	}
}