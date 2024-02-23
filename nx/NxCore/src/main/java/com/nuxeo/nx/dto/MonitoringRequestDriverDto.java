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
public class MonitoringRequestDriverDto implements Serializable {
	
	
	private static final long serialVersionUID = 5333622190978248466L;
	private Long id;
	private DriverDto driver;
	private MonitoringRequestDto monitoringRequest;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	
	public MonitoringRequestDriverDto() {
		
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
		MonitoringRequestDriverDto other = (MonitoringRequestDriverDto) obj;
		return Objects.equals(id, other.id);
	}
}
