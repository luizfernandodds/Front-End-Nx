package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TechnicalSheetGeometryDto implements Serializable {

	private static final long serialVersionUID = 8546252884795415561L;
	
	private Long id;
	private Integer type;
	private TechnicalSheetDto technicalSheet;
	private ControlPointDto controlPoint;
	private RouteDto route;
	private int sumDate;
	private Date timeArrival;
	private Date timeExit;
	private Integer sequence;
	private RouteDto routeAlternate;
	private BreakpointTypeDto breakpointType;
	private Integer distancePoint;
	private Integer totalDistance;
	private String label;
	
	public TechnicalSheetGeometryDto() { 
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
		TechnicalSheetGeometryDto other = (TechnicalSheetGeometryDto) obj;
		return Objects.equals(id, other.id);
	}
}