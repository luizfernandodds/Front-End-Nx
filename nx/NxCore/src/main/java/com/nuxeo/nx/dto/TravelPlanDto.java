package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TravelPlanDto implements Serializable {
	
	private static final long serialVersionUID = 4444066746777420435L;

	private Long id;
	private MonitoringRequestDto monitoringRequest;
	private InterestPointDto interestPoint;
	private Double weight;  
	private Double value; 
	private String series;  
	private Integer nfNumber; 
	private LocalDateTime dateNfEmission;  
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private String ocSd; 
	private String note;  
	private BreakpointTypeDto breakpointType;
	private String clientTaker;
	
	public TravelPlanDto() {
		
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
		TravelPlanDto other = (TravelPlanDto) obj;
		return Objects.equals(id, other.id);
	}
	

}
