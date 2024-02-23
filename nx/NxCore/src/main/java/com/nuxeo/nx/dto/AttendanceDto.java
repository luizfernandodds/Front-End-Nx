package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceDto implements Serializable {

	private static final long serialVersionUID = 4276206157487858455L;

	public static final String FIND_ALL_FETCH = "Attendance.findAllFetch";
	public static final String FIND_BY_TARGET = "Attendance.findByTarget";

	private Long id;
	private Date date;
	private String local;
	private String note;
	private Long targetId;
	private String treatedby;
	private AttendanceFlagDto attendanceFlag;
	private DriverDto driver;
	private AttendanceTypeDto type;
	private AttendanceStatusDto status;
	private List<AttendanceObsDto> attendanceObs;
	private Long loginId;
	private String identifier;
	private String country;
	private String city;
	private String state;
	private String neighborhood;
	private Double latitude;
	private Double longitude;
	private String name;
	private String phone;
	private String coordinates;

	public AttendanceDto() {
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
		AttendanceDto other = (AttendanceDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}