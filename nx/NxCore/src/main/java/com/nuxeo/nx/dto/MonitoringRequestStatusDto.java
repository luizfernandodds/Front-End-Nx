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
public class MonitoringRequestStatusDto implements Serializable  {
	
	
	private static final long serialVersionUID = -1994374365932929767L;
	private Long id;
	private MonitoringRequestDto monitoringRequest;
	private StatusSmDto statusSm;
	private LoginDto loginCreate;
	private LocalDateTime dateCreate;
	private String note;

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
		MonitoringRequestStatusDto other = (MonitoringRequestStatusDto) obj;
		return Objects.equals(id, other.id);
	} 
}
