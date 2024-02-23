package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.nuxeo.nx.utils.DateUtilConverter;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the position database table.
 * 
 */
@ToString
@Getter
@Setter
public class PackageEntity {

	private Long id;
	private String identifier;
	private Integer altitude;
	private Long costumer;
	private Date dateGps;
	private Date dateServerWriter;
	private Long deviceId;
	private Boolean gpsFail;
	private Boolean gpsValid;
	private Integer gpsSvn;
	private Integer vcc;
	private Integer battery;
	private Long positionId;
	private Boolean input1;
	private Boolean input2;
	private Boolean input3;
	private Boolean input4;
	private Double latitude;
	private Double longitude;
	private Boolean memory;
	private Integer odometer;
	private Boolean output1;
	private Boolean output2;
	private Boolean output3;
	private Boolean output4;
	private Boolean panic;
	private Boolean block;
	private Boolean ignition;
	private Integer protocolId;
	private Date serverDate;
	private Boolean execessSpeed;
	private Integer serverId;
	private String serialId;
	private Integer speed;
	private Integer hourimeter;
	private Integer source;
	private Boolean excessStoppedTime;
	private Integer costumerType;
	private Boolean input5;
	private Boolean input6;
	private Boolean input7;
	private Boolean input8;
	private Boolean input9;
	private Boolean input10;
	private Boolean input11;
	private Boolean input12;
	private Boolean input13;
	private Boolean input14;
	private Boolean input15;
	private Boolean input16;
	private Boolean output5;
	private Boolean output6;
	private Boolean output7;
	private Boolean output8;
	private Boolean output9;
	private Boolean output10;
	private Boolean output11;
	private Boolean output12;
	private Boolean output13;
	private Boolean output14;
	private Boolean output15;
	private Boolean output16;
	private String address;
	private String city;
	private String district;
	private String state;
	private String country;
	private Long driverId;
	private Boolean internalAlert;
	private Boolean batteryAlert;
	private Integer antiTheft;
	private Boolean satellite;
	private String coordinates;
	private DriverDto driver;
	private TargetDto target;
	private String driverName;
	private String formatedSpeed;
	private String fullAddress;
	private String fullAddressReport;
	private static final String stringNull = "-";
	private static final String dateFormatDefault = "dd/MM/yyyy HH:mm:ss";
	private SimpleDateFormat formatter;
	private Double distanceTraveled;
	private String directionMax;
	private Integer speedMax;
	private Double speedMed;
	private String elapsedTime;
	private String downtime;
	private Date ignitionOnTime;
	private Date ignitionOffTime;
	private Integer eventNumber;
	private Date dateGpsPackage;
	private Integer index;

	public PackageEntity() {
		formatter = new SimpleDateFormat(dateFormatDefault);
	}

	// informacaoes formatas
	public String getFormatLatitude(Locale locale) {

		if (this.latitude == null)
			return stringNull;

		if (locale == null) {
			locale = Locale.GERMAN; // para ficar com ',' como seperador de
			// double
		}

		return String.format(locale, "%.6f", this.latitude);
	}

	public String getFormatLatitude() {

		return this.getFormatLatitude(null);
	}

	public String getFormatLongitude(Locale locale) {

		if (this.longitude == null)
			return stringNull;

		if (locale == null) {
			locale = Locale.GERMAN; // para ficar com ',' como seperador de
			// double
		}

		return String.format(locale, "%.6f", this.longitude);
	}

	public String getFormatLongitude() {

		return this.getFormatLongitude(null);
	}

	public String getFormatPosition() {

		if (this.latitude == null || this.longitude == null)
			return stringNull;

		return String.format(Locale.GERMAN, "%.6f, %.6f", this.latitude,
				this.longitude);
	}

	public String getFormatPanic() {

		if (this.panic == null)
			return stringNull;

		return this.panic ? "ON" : "OFF";
	}

	public String getFormatBloq() {

		if (this.block == null)
			return stringNull;

		return this.block ? "ON" : "OFF";
	}

	public String getFormatMemory() {

		if (this.memory == null)
			return stringNull;

		return this.memory ? "ON" : "OFF";
	}

	public String getFormatIgnition() {

		if (this.ignition == null)
			return stringNull;

		return this.ignition ? "ON" : "OFF";
	}

	public String getFormatSpeed() {
		return this.speed != null ? this.speed + " km/h" : stringNull;
	}

	public String getFormatGps() {

		if (this.dateGps == null)
			return stringNull;

		return formatter.format(this.getDateGps());

	}
	
	public String getFormatGpsReport() {

		if (this.dateGps == null)
			return stringNull;

		return formatter.format(DateUtilConverter.convertTimeZone(this.dateGps,120));
//		return formatter.format(DateUtilConverter.convertTimeZone(this.dateGps,180));

	}
	
	public String getFullAddressReport() {
		fullAddressReport = getAddress();

		if (getCity() != null) {
			this.fullAddressReport += ", " + getCity();
		}
		if (this.state != null) {
			this.fullAddressReport += ", " + getState();
		}

		return fullAddressReport;
	}
}