package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TargetDto implements Serializable {

	private static final long serialVersionUID = -7058349383801000281L;
	
	private Long id;
	private Boolean active;
	private Integer icon;
	private String identifier;
	private String name;
//	private Set<Eventdto> lsitEvents;
//	private Set<GroupControlDto> listGroups;
	private CustomerDto customer;
	private DeviceDto device;
	private TargetTypeDto targetType;
	private TargetModelDto targetModel;
	private LocalDateTime dateDelete;
	private DriverDto driver;
	private String chassi;
	private String answerable;
	private String emailAnswerable;
	private String phoneAnswerable;
//	private List<PhoneDto> phones;
//	private List<SentinelDto> listSentinel;
	private String renavam;
	private String operation;
	private SemiTrailerDto semiTrailer;
	private Integer weight;
	private Boolean accident=false;
	
	public int hashCode() {
		int result = 1;
		result = 31 * result + (this.id == null ? 0 : this.id.hashCode());
		result = 31 * result + (this.identifier == null ? 0 : this.identifier.hashCode());
		result = 31 * result + (this.name == null ? 0 : this.name.hashCode());
		return result;
	}

	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TargetDto other = (TargetDto) obj;
		if (this.id == null) {
			if (other.id != null)
				return false;
		} else if (!this.id.equals(other.id))
			return false;
		if (this.identifier == null) {
			if (other.identifier != null)
				return false;
		} else if (!this.identifier.equals(other.identifier))
			return false;
		if (this.name == null) {
			if (other.name != null)
				return false;
		} else if (!this.name.equals(other.name))
			return false;
		return true;
	}
	
}