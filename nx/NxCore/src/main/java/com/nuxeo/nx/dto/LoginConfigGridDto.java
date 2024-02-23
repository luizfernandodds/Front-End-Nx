package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login database table.
 * 
 */
@Getter
@Setter
@ToString
public class LoginConfigGridDto implements Serializable {

	private static final long serialVersionUID = -1128407261067897931L;
	private Long id;
	private LoginDto login;
	private boolean detail;
	private boolean target;
	private boolean driver;
	private boolean semitrailer1;
	private boolean semitrailer2;
	private boolean formatDateGps;
	private boolean formatPosition;
	private boolean latitude;
	private boolean longitude;
	private boolean altitude;
	private boolean odometer;
	private boolean hourmeter;
	private boolean address;
	private boolean city;
	private boolean state;
	private boolean formatSpeed;
	private boolean targetIcon;
	private boolean status;
	private boolean tools;
	private boolean nameClient;
	private boolean panic;
	private boolean block;
	private boolean ignition;
	private boolean line;
	private boolean serial;
	private boolean satellite;
	private boolean memory;

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
		LoginConfigGridDto other = (LoginConfigGridDto) obj;
		return Objects.equals(id, other.id);
	}
}