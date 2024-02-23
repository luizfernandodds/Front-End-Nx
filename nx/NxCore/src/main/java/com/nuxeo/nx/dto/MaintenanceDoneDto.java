package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the maintenance_done database table.
 * 
 */
@ToString
@Getter
@Setter
public class MaintenanceDoneDto implements Serializable {

	private static final long serialVersionUID = -6252205205139354324L;
	
	private Long id;
	private LocalDateTime date;
	private Long value;
	private Long diff;
	private Integer timeDiff;
	private String description;
	private MaintenanceDto maintenance;
	private TargetDto target;
	private Long currentValue;
	private LocalDateTime currentDate;

	public MaintenanceDoneDto() {
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
		MaintenanceDoneDto other = (MaintenanceDoneDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}