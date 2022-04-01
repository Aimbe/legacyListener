class Aria {
	constructor(){
		let s1_buffer = new ArrayBuffer(256);
		let s2_buffer = new ArrayBuffer(256);
		let x1_buffer = new ArrayBuffer(256);
		let x2_buffer = new ArrayBuffer(256);
		
		this.S1 = new Int8Array(s1_buffer);
		this.S2 = new Int8Array(s2_buffer);
		this.X1 = new Int8Array(x1_buffer);
		this.X2 = new Int8Array(x2_buffer);
		
		this.TS1 = new Array(256);
		this.TS2 = new Array(256);
		this.TX1 = new Array(256);
		this.TX2 = new Array(256);
		
		this.KRK = [
		    [1367130551, 656542356, -32265240, -90542368], 
			[1840335564, -1641953248, -14110251, -279059792], 
			[-611174627, 556198256, 52729717, 82364686]
		];
		
		this.ARIA_BLOCK_SIZE = 16;
		this.keySize = 0;
		this.numberOfRounds = 0;
		this.masterKeyStr = "0000000000000000";
		this.masterKey = null;
		this.encRoundKeys = null;
		this.decRoundKeys = null;
		
		this.setInit();
	}
	
	setInit(){
		let exp = new Array(256);
		let log = new Array(256);
		
		for(let i=0 ; i<256 ; i++){
			this.S1[i] = 0;
			this.S2[i] = 0;
			this.X1[i] = 0;
			this.X2[i] = 0;
			log[i] = 0;
			exp[i] = 0;
	    }
		
		exp[0] = 1;
		
		for (let i=1 ; i<256; i++) {
		    let j = (exp[i-1] << 1) ^ exp[i-1];
		    if ((j & 0x100) != 0){
		        j ^= 0x11b;
		    }
		    exp[i] = j;
		}
		
		for(let i=1 ; i<255; i++){
		    log[exp[i]] = i;
		}
		
		let A = [
		    [1, 0, 0, 0, 1, 1, 1, 1],
		    [1, 1, 0, 0, 0, 1, 1, 1],
		    [1, 1, 1, 0, 0, 0, 1, 1],
		    [1, 1, 1, 1, 0, 0, 0, 1],
		    [1, 1, 1, 1, 1, 0, 0, 0],
		    [0, 1, 1, 1, 1, 1, 0, 0],
		    [0, 0, 1, 1, 1, 1, 1, 0],
		    [0, 0, 0, 1, 1, 1, 1, 1]
		];
		
		let B = [
		    [0, 1, 0, 1, 1, 1, 1, 0],
		    [0, 0, 1, 1, 1, 1, 0, 1], 
		    [1, 1, 0, 1, 0, 1, 1, 1], 
		    [1, 0, 0, 1, 1, 1, 0, 1], 
		    [0, 0, 1, 0, 1, 1, 0, 0], 
		    [1, 0, 0, 0, 0, 0, 0, 1], 
		    [0, 1, 0, 1, 1, 1, 0, 1], 
		    [1, 1, 0, 1, 0, 0, 1, 1]
		];
		
		
		for (let i=0 ; i<256 ; i++) {
		    let t = 0; 
		    let p;
		
		    if (i == 0){
		        p = 0;
		    } else {
		        p = exp[255 - log[i]];
		    }
		
		    for (let j=0 ; j<8 ; j++) {
		      let s = 0;
		      for (let k=0 ; k<8 ; k++) {
		        if (((p >>> (7 - k))&0x01) != 0){
		            s ^= A[k][j];
		        }
		      }
		      t = (t<<1)^s;
		    }
		    
		    t ^= 0x63;
		    this.S1[i] = t;
		    this.X1[t] = i;
		}
		
		for (let i=0 ; i<256 ; i++) {
		    let t = 0, p;
		    if (i == 0){
		        p = 0;
		    } else {
		        p = exp[(247 * log[i])%255];
		    }
		
		    for (let j= 0; j<8 ; j++) {
		      let s = 0;
		      for (let k = 0 ; k<8 ; k++) {
		        if (((p >>> k) & 0x01) != 0) {
		            s ^= B[7-j][k];
		        }
		      }
		      t = (t << 1) ^ s;
		    }
		
		    t ^= 0xe2;
		    this.S2[i] = t;
		    this.X2[t] = i;
		}
		
		for (let i = 0; i < 256; i++) {
			this.TS1[i] = mkTS1(this.S1[i]);
			this.TS2[i] = mkTS2(this.S2[i]);
		    this.TX1[i] = mkTX1(this.X1[i]);
			this.TX2[i] = mkTX2(this.X2[i]);
		}
	}
	
	reset() {
	    this.keySize = 0;
	    this.numberOfRounds = 0;
	    this.masterKey = null;
	    this.encRoundKeys = null;
	    this.decRoundKeys = null;
	}
	
	setKeySize(p_keySize){
	    this.reset();
	    if(p_keySize != 128 && p_keySize != 192 && p_keySize != 256){
	        console.log("keySize is " + p_keySize); 
	    }
	    this.keySize = p_keySize;
	
	    switch(p_keySize){
	        case 128:
	            this.numberOfRounds = 12;
	            break;
	        case 192:
	            this.numberOfRounds = 14;
	            break;
	        case 256:
	            this.numberOfRounds = 16;
	            break;
	    }
	}
	
	setKey(p_masterKey){
	    if(p_masterKey.length*8 < this.keySize){
	        console.log("masterKey size is " + p_masterKey.length);
	    }
	    this.decRoundKeys = null;
	    this.encRoundKeys = null;
	    
	    this.masterKey = JSON.parse(JSON.stringify(p_masterKey));
	}
	
	setupRoundKeys(){
	    this.setupDecRoundKeys();
	}
	
	setupDecRoundKeys(){
	    if(this.keySize == 0){
	        console.log("keySize is 0");
	    }
	    if(this.encRoundKeys == null){
	        if(this.masterKey == null){
	            console.log("masterKey is null");
	        } else {
	            this.setupEncRoundKeys();
	        }
	    }
	    
	    this.decRoundKeys = JSON.parse(JSON.stringify(this.encRoundKeys));
	    
	    this.doDecKeySetup(this.masterKey, this.decRoundKeys, this.keySize);
	}

	setupEncRoundKeys(){
	    if(this.keySize == 0){
	        console.log("keySize is 0");
	    }
	    if(this.masterKey == null){
	        console.log("masterKey is null");
	    }
	    if(this.encRoundKeys == null){
	        this.encRoundKeys = new Array(4*(this.numberOfRounds+1)).fill(0);
	    }
	    this.decRoundKeys = null;
	    
	    this.doEncKeySetup(this.masterKey, this.encRoundKeys, this.keySize);
	}
	
	doDecKeySetup(mk, rk, keyBits) {
	    let a = 0;
	    let z;
	    let t = [0, 0, 0, 0];
	        
	    z = 32 + (keyBits / 8) ;
	    
	    swapBlocks(rk, 0, z);
	    
	    a += 4;
	    z -= 4;
	    
	    for (; a<z ; a+=4, z-=4){
	        swapAndDiffuse(rk, a, z, t);
	    }
	
	    diff(rk, a, t, 0);
	    
	    rk[a] = t[0];
	    rk[a + 1] = t[1];
	    rk[a + 2] = t[2];
	    rk[a + 3] = t[3];
	}

	doEncKeySetup(mk, rk, keyBits){
	    let t0;
	    let t1;
	    let t2;
	    let t3;
	    let q;
	    let j = 0;
	
	    let w0 = [0, 0, 0, 0];
	    let w1 = [0, 0, 0, 0];
	    let w2 = [0, 0, 0, 0];
	    let w3 = [0, 0, 0, 0];
	
	    w0[0] = toInt(mk[0], mk[1], mk[2], mk[3]);
	    w0[1] = toInt(mk[4], mk[5], mk[6], mk[7]);
	    w0[2] = toInt(mk[8], mk[9], mk[10], mk[11]);
	    w0[3] = toInt(mk[12], mk[13], mk[14], mk[15]);
	
	    q = (keyBits - 128) / 64;
	
	    t0 = w0[0] ^ this.KRK[q][0];
	    t1 = w0[1] ^ this.KRK[q][1];
	    t2 = w0[2] ^ this.KRK[q][2];
	    t3 = w0[3] ^ this.KRK[q][3];
	
	    t0 = this.TS1[(t0>>>24)&0xff] ^ this.TS2[(t0>>>16)&0xff] ^ this.TX1[(t0>>>8)&0xff] ^ this.TX2[t0&0xff];
	    t1 = this.TS1[(t1>>>24)&0xff] ^ this.TS2[(t1>>>16)&0xff] ^ this.TX1[(t1>>>8)&0xff] ^ this.TX2[t1&0xff];
	    t2 = this.TS1[(t2>>>24)&0xff] ^ this.TS2[(t2>>>16)&0xff] ^ this.TX1[(t2>>>8)&0xff] ^ this.TX2[t2&0xff];
	    t3 = this.TS1[(t3>>>24)&0xff] ^ this.TS2[(t3>>>16)&0xff] ^ this.TX1[(t3>>>8)&0xff] ^ this.TX2[t3&0xff];   
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    t1 = badc(t1);
	    t2 = cdab(t2);
	    t3 = dcba(t3);
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    if (keyBits > 128) {
	        w1[0] = toInt(mk[16], mk[17], mk[18], mk[19]);
	        w1[1] = toInt(mk[20], mk[21], mk[22], mk[23]);
	        if (keyBits > 192) {
	            w1[2] = toInt(mk[24], mk[25], mk[26], mk[27]);
	            w1[3] = toInt(mk[28], mk[29], mk[30], mk[31]);
	        }
	        else {
	            w1[2] = w1[3] = 0;
	        }
	    }
	    else {
	        w1[0] = w1[1] = w1[2] = w1[3] = 0;
	    }
	
	    w1[0] ^= t0;
	    w1[1] ^= t1;
	    w1[2] ^= t2;
	    w1[3] ^= t3;
	
	    t0 = w1[0];
	    t1 = w1[1];
	    t2 = w1[2];
	    t3 = w1[3];
	
	    q = (q === 2) ? 0 : (q + 1);
	
	    t0 ^= this.KRK[q][0];
	    t1 ^= this.KRK[q][1];
	    t2 ^= this.KRK[q][2];
	    t3 ^= this.KRK[q][3];
	
	    t0 = this.TX1[(t0>>>24)&0xff] ^ this.TX2[(t0>>>16)&0xff] ^ this.TS1[(t0>>>8)&0xff] ^ this.TS2[t0&0xff];
	    t1 = this.TX1[(t1>>>24)&0xff] ^ this.TX2[(t1>>>16)&0xff] ^ this.TS1[(t1>>>8)&0xff] ^ this.TS2[t1&0xff];
	    t2 = this.TX1[(t2>>>24)&0xff] ^ this.TX2[(t2>>>16)&0xff] ^ this.TS1[(t2>>>8)&0xff] ^ this.TS2[t2&0xff];
	    t3 = this.TX1[(t3>>>24)&0xff] ^ this.TX2[(t3>>>16)&0xff] ^ this.TS1[(t3>>>8)&0xff] ^ this.TS2[t3&0xff];  
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    t3 = badc(t3);
	    t0 = cdab(t0);
	    t1 = dcba(t1);
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    t0 ^= w0[0];
	    t1 ^= w0[1];
	    t2 ^= w0[2];
	    t3 ^= w0[3];
	
	    w2[0] = t0;
	    w2[1] = t1;
	    w2[2] = t2;
	    w2[3] = t3;
	
	    q = (q === 2) ? 0 : (q + 1);
	
	    t0 ^= this.KRK[q][0];
	    t1 ^= this.KRK[q][1];
	    t2 ^= this.KRK[q][2];
	    t3 ^= this.KRK[q][3];
	
	    t0 = this.TS1[(t0>>>24)&0xff] ^ this.TS2[(t0>>>16)&0xff] ^ this.TX1[(t0>>>8)&0xff] ^ this.TX2[t0&0xff];
	    t1 = this.TS1[(t1>>>24)&0xff] ^ this.TS2[(t1>>>16)&0xff] ^ this.TX1[(t1>>>8)&0xff] ^ this.TX2[t1&0xff];
	    t2 = this.TS1[(t2>>>24)&0xff] ^ this.TS2[(t2>>>16)&0xff] ^ this.TX1[(t2>>>8)&0xff] ^ this.TX2[t2&0xff];
	    t3 = this.TS1[(t3>>>24)&0xff] ^ this.TS2[(t3>>>16)&0xff] ^ this.TX1[(t3>>>8)&0xff] ^ this.TX2[t3&0xff];  
	    
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    t1 = badc(t1);
	    t2 = cdab(t2);
	    t3 = dcba(t3);
	    
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	    
	    w3[0] = t0 ^ w1[0];
	    w3[1] = t1 ^ w1[1];
	    w3[2] = t2 ^ w1[2];
	    w3[3] = t3 ^ w1[3];
	
		gsrk(w0, w1, 19, rk, j);
	    j += 4;
	    gsrk(w1, w2, 19, rk, j);
	    j += 4;
	    gsrk(w2, w3, 19, rk, j);
	    j += 4;
	    gsrk(w3, w0, 19, rk, j);
	    j += 4;
	    gsrk(w0, w1, 31, rk, j);
	    j += 4;
	    gsrk(w1, w2, 31, rk, j);
	    j += 4;
	    gsrk(w2, w3, 31, rk, j);
	    j += 4;
	    gsrk(w3, w0, 31, rk, j);
	    j += 4;
	    gsrk(w0, w1, 67, rk, j);
	    j += 4;
	    gsrk(w1, w2, 67, rk, j);
	    j += 4;
	    gsrk(w2, w3, 67, rk, j);
	    j += 4;
	    gsrk(w3, w0, 67, rk, j);
	    j += 4;
	    gsrk(w0, w1, 97, rk, j);
	    j += 4;
	
	    if (keyBits > 128) {
	        gsrk(w1, w2, 97, rk, j);
	        j += 4;
	        gsrk(w2, w3, 97, rk, j);
	        j += 4;
	    }
	    
	    if (keyBits > 192) {
	        gsrk(w3, w0, 97, rk, j);
	        j += 4;
	        gsrk(w0, w1, 109, rk, j);
	    }
	
	}
	
	doEncrypt(i, ioffset, o, ooffset){
	    if(this.keySize == 0){
	        console.log("keySize is 0");
	    }
	    if(this.encRoundKeys == null){
	        if(this.masterKey == null){
	            console.log("masterKey is null");
	        } else {
	            this.setupEncRoundKeys();
	        }
	    }
	    this.doCrypt(i, ioffset, this.encRoundKeys, this.numberOfRounds, o, ooffset);
	}

	doDecrypt(i, ioffset, o, ooffset){
	    if(this.keySize == 0){
	        console.log("keySize is 0");
	    }
	    if(this.decRoundKeys == null){
	        if(this.masterKey == null){
	            console.log("masterKey is null");
	        } else {
	            this.setupDecRoundKeys();
	        }
	    }
	    this.doCrypt(i, ioffset, this.decRoundKeys, this.numberOfRounds, o, ooffset);
	}

	doCrypt(i, ioffset, rk, nr, o, ooffset){
	    let t0;
	    let t1;
	    let t2;
	    let t3;
	    let j = 0;
	
	    t0 = toInt(i[0 + ioffset*16], i[1 + ioffset*16], i[2 + ioffset*16], i[3 + ioffset*16]);
	    t1 = toInt(i[4 + ioffset*16], i[5 + ioffset*16], i[6 + ioffset*16], i[7 + ioffset*16]);
	    t2 = toInt(i[8 + ioffset*16], i[9 + ioffset*16], i[10 + ioffset*16], i[11 + ioffset*16]);
	    t3 = toInt(i[12 + ioffset*16], i[13 + ioffset*16], i[14 + ioffset*16], i[15 + ioffset*16]);
	
	    for(let r = 1 ; r < (nr / 2) ; r++){
	        t0 ^= rk[j++];
	        t1 ^= rk[j++];
	        t2 ^= rk[j++];
	        t3 ^= rk[j++];
	        
	        t0 = this.TS1[(t0 >>> 24) & 0xff] ^ this.TS2[(t0 >>> 16) & 0xff] ^ this.TX1[(t0 >>> 8) & 0xff] ^ this.TX2[t0 & 0xff];
	        t1 = this.TS1[(t1 >>> 24) & 0xff] ^ this.TS2[(t1 >>> 16) & 0xff] ^ this.TX1[(t1 >>> 8) & 0xff] ^ this.TX2[t1 & 0xff];
	        t2 = this.TS1[(t2 >>> 24) & 0xff] ^ this.TS2[(t2 >>> 16) & 0xff] ^ this.TX1[(t2 >>> 8) & 0xff] ^ this.TX2[t2 & 0xff];
	        t3 = this.TS1[(t3 >>> 24) & 0xff] ^ this.TS2[(t3 >>> 16) & 0xff] ^ this.TX1[(t3 >>> 8) & 0xff] ^ this.TX2[t3 & 0xff];
	
	        t1 ^= t2;
	        t2 ^= t3;
	        t0 ^= t1;
	        t3 ^= t1;
	        t2 ^= t0;
	        t1 ^= t2;
	
	        t1 = badc(t1);
	        t2 = cdab(t2);
	        t3 = dcba(t3);
	
	        t1 ^= t2;
	        t2 ^= t3;
	        t0 ^= t1;
	        t3 ^= t1;
	        t2 ^= t0;
	        t1 ^= t2;
	
	        t0 ^= rk[j++];
	        t1 ^= rk[j++];
	        t2 ^= rk[j++];
	        t3 ^= rk[j++];
	    
	        t0 = this.TX1[(t0 >>> 24) & 0xff] ^ this.TX2[(t0 >>> 16) & 0xff] ^ this.TS1[(t0 >>> 8) & 0xff] ^ this.TS2[t0 & 0xff];
	        t1 = this.TX1[(t1 >>> 24) & 0xff] ^ this.TX2[(t1 >>> 16) & 0xff] ^ this.TS1[(t1 >>> 8) & 0xff] ^ this.TS2[t1 & 0xff];
	        t2 = this.TX1[(t2 >>> 24) & 0xff] ^ this.TX2[(t2 >>> 16) & 0xff] ^ this.TS1[(t2 >>> 8) & 0xff] ^ this.TS2[t2 & 0xff];
	        t3 = this.TX1[(t3 >>> 24) & 0xff] ^ this.TX2[(t3 >>> 16) & 0xff] ^ this.TS1[(t3 >>> 8) & 0xff] ^ this.TS2[t3 & 0xff];
	
	        t1 ^= t2;
	        t2 ^= t3;
	        t0 ^= t1;
	        t3 ^= t1;
	        t2 ^= t0;
	        t1 ^= t2;
	
	        t3 = badc(t3);
	        t0 = cdab(t0);
	        t1 = dcba(t1);
	
	        t1 ^= t2;
	        t2 ^= t3;
	        t0 ^= t1;
	        t3 ^= t1;
	        t2 ^= t0;
	        t1 ^= t2;
	    }
	
	    t0 ^= rk[j++];
	    t1 ^= rk[j++];
	    t2 ^= rk[j++];
	    t3 ^= rk[j++];
	
	    t0 = this.TS1[(t0 >>> 24) & 0xff] ^ this.TS2[(t0 >>> 16) & 0xff] ^ this.TX1[(t0 >>> 8) & 0xff] ^ this.TX2[t0 & 0xff];
	    t1 = this.TS1[(t1 >>> 24) & 0xff] ^ this.TS2[(t1 >>> 16) & 0xff] ^ this.TX1[(t1 >>> 8) & 0xff] ^ this.TX2[t1 & 0xff];
	    t2 = this.TS1[(t2 >>> 24) & 0xff] ^ this.TS2[(t2 >>> 16) & 0xff] ^ this.TX1[(t2 >>> 8) & 0xff] ^ this.TX2[t2 & 0xff];
	    t3 = this.TS1[(t3 >>> 24) & 0xff] ^ this.TS2[(t3 >>> 16) & 0xff] ^ this.TX1[(t3 >>> 8) & 0xff] ^ this.TX2[t3 & 0xff];
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	
	    t1 = badc(t1);
	    t2 = cdab(t2);
	    t3 = dcba(t3);
	
	    t1 ^= t2;
	    t2 ^= t3;
	    t0 ^= t1;
	    t3 ^= t1;
	    t2 ^= t0;
	    t1 ^= t2;
	  
	    t0 ^= rk[j++];
	    t1 ^= rk[j++];
	    t2 ^= rk[j++];
	    t3 ^= rk[j++];
	
	    o[ 0 + ooffset*16] = this.X1[0xff&(t0>>>24)] ^ (rk[j]>>>24);
	    o[ 1 + ooffset*16] = this.X2[0xff&(t0>>>16)] ^ (rk[j]>>>16);
	    o[ 2 + ooffset*16] = this.S1[0xff&(t0>>> 8)] ^ (rk[j]>>> 8);
	    o[ 3 + ooffset*16] = this.S2[0xff&(t0)] ^ (rk[j]);
	    o[ 4 + ooffset*16] = this.X1[0xff&(t1>>>24)] ^ (rk[j+1]>>>24);
	    o[ 5 + ooffset*16] = this.X2[0xff&(t1>>>16)] ^ (rk[j+1]>>>16);
	    o[ 6 + ooffset*16] = this.S1[0xff&(t1>>> 8)] ^ (rk[j+1]>>> 8);
	    o[ 7 + ooffset*16] = this.S2[0xff&(t1)] ^ (rk[j+1]);
	    o[ 8 + ooffset*16] = this.X1[0xff&(t2>>>24)] ^ (rk[j+2]>>>24);
	    o[ 9 + ooffset*16] = this.X2[0xff&(t2>>>16)] ^ (rk[j+2]>>>16);
	    o[10 + ooffset*16] = this.S1[0xff&(t2>>> 8)] ^ (rk[j+2]>>> 8);
	    o[11 + ooffset*16] = this.S2[0xff&(t2)] ^ (rk[j+2]);
	    o[12 + ooffset*16] = this.X1[0xff&(t3>>>24)] ^ (rk[j+3]>>>24);
	    o[13 + ooffset*16] = this.X2[0xff&(t3>>>16)] ^ (rk[j+3]>>>16);
	    o[14 + ooffset*16] = this.S1[0xff&(t3>>> 8)] ^ (rk[j+3]>>> 8);
	    o[15 + ooffset*16] = this.S2[0xff&(t3)] ^ (rk[j+3]);
	}


}

function toInt(b0, b1, b2, b3){
    return (b0 & 0xff) << 24 ^ (b1 & 0xff) << 16 ^ (b2 & 0xff) << 8 ^ b3 & 0xff;
}

function badc(t) {
     return ((t << 8) & -16711936) ^ ((t >>> 8) & 16711935);
}

function cdab(t) {
     return ((t << 16) & -65536) ^ ((t >>> 16) & 65535);
}

function dcba(t) {
     return (t & 255) << 24 ^ (t & 65280) << 8 ^ (t & 16711680) >>> 8 ^ (t & -16777216) >>> 24;
}

function gsrk(x, y, rot, rk, offset){
    let q = 4 - parseInt(rot / 32); // q is integer
    let r = rot % 32;
    let s = 32 - r;
    
    rk[offset] 		= x[0] ^ y[(q) % 4] >>> r ^ y[(q + 3) % 4] << s;
    rk[offset+1] 	= x[1] ^ y[(q + 1) % 4] >>> r ^ y[(q) % 4] << s;
    rk[offset+2] 	= x[2] ^ y[(q + 2) % 4] >>> r ^ y[(q + 1) % 4] << s;
    rk[offset+3] 	= x[3] ^ y[(q + 3) % 4] >>> r ^ y[(q + 2) % 4] << s;
}

function m(t){
    return 0x00010101*((t>>>24)&0xff) ^ 0x01000101*((t>>>16)&0xff) ^ 0x01010001*((t>>>8)&0xff) ^ 0x01010100*(t&0xff);
}

function diff(i, offset1, o, offset2) {
    let t0;
    let t1;
    let t2;
    let t3;

    t0 = m(i[offset1]);
    t1 = m(i[offset1 + 1]);
    t2 = m(i[offset1 + 2]);
    t3 = m(i[offset1 + 3]);
    
    t1 ^= t2;
    t2 ^= t3;
    t0 ^= t1;
    t3 ^= t1;
    t2 ^= t0;
    t1 ^= t2;
    
    t1 = badc(t1);
    t2 = cdab(t2);
    t3 = dcba(t3);
    
    t1 ^= t2;
    t2 ^= t3;
    t0 ^= t1;
    t3 ^= t1;
    t2 ^= t0;
    t1 ^= t2;
    
    o[offset2] = t0;
    o[offset2 + 1] = t1;
    o[offset2 + 2] = t2;
    o[offset2 + 3] = t3;
}

function swapBlocks(arr, offset1, offset2){
    let t;
    for(let i = 0 ; i <4 ; i++){
        t = arr[offset1 + i];
        arr[offset1 + i] = arr[offset2 + i];
        arr[offset2 + i] = t;
    }
}

function swapAndDiffuse(arr, offset1, offset2, tmp){
    diff(arr, offset1, tmp, 0);
    diff(arr, offset2, arr, offset1);
    arr[offset2] = tmp[0];
    arr[offset2 + 1] = tmp[1];
    arr[offset2 + 2] = tmp[2];
    arr[offset2 + 3] = tmp[3];
}

function intToByte(num){
	let result = num;
	if(num > 127){
		result = -1 * (256 - num);
	}
	return result;
}

function byteToInt(p_byte){
	let result = p_byte;
	if(p_byte < 0){
		result = 256 + p_byte;
	}
	return result;
}

function mkTS1(num){
	let result = 65793 * num;//??
	if(num < 0){
		result = result + 16843008;
	} 	
	return result;
}

function mkTS2(num){
	let result = 16777473 * byteToInt(num);
	if(num < 0){
		result = result - 4294967296;
	} 	
	return result;
}

function mkTX1(num){
	let result = 16842753 * byteToInt(num);
	if(num < 0){
		result = result - 4294967296;
	} 	
	return result;
}

function mkTX2(num){
	let result = 16843008 * byteToInt(num);
	if(num < 0){
		result = result - 4294967296;
	} 	
	return result;
}

function printBlock(byte_arr){
    let result = "";
    for(let i=0 ; i<byte_arr.length ; i++){
		let tmp_int = parseInt(byte_arr[i]);
		let tmp_str = String.fromCodePoint(tmp_int&0xff);
		result = result + tmp_str;
    }
	return result;
}

function numberToHex(byte_arr){
	let result = "";
	for(let i=0 ; i<byte_arr.length ; i++){
		let num = parseInt(byte_arr[i]);
		if(num >= 0){
			if(num == 1){
				console.log("1");
			}
			let hex = parseInt(num, 10).toString(16).toUpperCase();
			let hexaDigit = "";
			if(hex.toString().length < 2){
				hexaDigit = "0" + hex;
			} else {
				hexaDigit = hex;
			}
//			hex.toString().length < 2 ? '0' + hex + '' : hex;
			result = result + hexaDigit;
		} else {
			num = 0xFF + num + 1;
			let hex = parseInt(num, 10).toString(16).toUpperCase();
			hex.toString().length < 2 ? '0' + hex : hex;
			result = result + hex;
		}
	}
	return result;
}

function pad(in_byte_arr, blockSize){
	let offset = in_byte_arr.length;
	let len = blockSize - (offset % blockSize);
	
	let paddingOctet = len & 0xff; //(byte)
	
	let out_buffer = new ArrayBuffer(offset + len);
	let out = new Int8Array(out_buffer);
	
	for (let i = offset ; i < out.length ; i++) {
		out[i] = paddingOctet;
	}
	
}

function encrypt(plaintext, keyBits){
	let aria = new Aria();
	
    let p_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);
	let c_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);
  	let mk_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);

    let p = new Int8Array(p_buffer);
  	let c = new Int8Array(c_buffer);
  	let mk = new Int8Array(mk_buffer);//EVERONXULVAC2017
  	
    let mkString = aria.masterKeyStr;
  	let input_mk_arr = mkString.split('');
    for(let i=0 ; i<input_mk_arr.length ; i++){
        mk[i] = input_mk_arr[i].charCodeAt(0);
    }
    
    let offset = parseInt(plaintext.length / aria.ARIA_BLOCK_SIZE);
    
  	if(plaintext.length % aria.ARIA_BLOCK_SIZE != 0 ){
		offset += 1;
	}
	
	let result_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE*offset);
  	let result = new Int8Array(result_buffer);
	
    aria.setKeySize(keyBits);
	aria.setKey(mk);
	aria.setupRoundKeys();
	
    let input_p_arr = plaintext.split('');
	for(let i=0 ; i<offset ;i++){
		for(let k=0 ; k<aria.ARIA_BLOCK_SIZE ; k++){
			let tmp_p_arr = input_p_arr.slice(i * aria.ARIA_BLOCK_SIZE, i * aria.ARIA_BLOCK_SIZE + aria.ARIA_BLOCK_SIZE);
			p[k] = tmp_p_arr[k].charCodeAt(0);
			c[k] = 0;
		}
		
		aria.doEncrypt(p, 0, c, 0);
		
		for(let k=0 ; k<aria.ARIA_BLOCK_SIZE ; k++){
			result[i*aria.ARIA_BLOCK_SIZE + k] = c[k];
		}
//    	console.log("plaintext : " + printBlock(p));
	}
	
	//console.log("ciphertext : " + printBlock(result));
	//console.log("ciphertext : " + numberToHex(result));

	return printBlock(result);
}

function decrypt(ciphertext, keyBits){
  	let aria = new Aria();
  	
    let p_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);
	let c_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);
  	let mk_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE);//16? 32?

    let p = new Int8Array(p_buffer);
  	let c = new Int8Array(c_buffer);
  	let mk = new Int8Array(mk_buffer);//EVERONXULVAC2017
    
  	
    let mkString = aria.masterKeyStr;
  	let input_mk_arr = mkString.split('');
    for(let i=0 ; i<input_mk_arr.length ; i++){
        mk[i] = input_mk_arr[i].charCodeAt(0);
    }
    
    let offset = parseInt(ciphertext.length / aria.ARIA_BLOCK_SIZE);
  	if(ciphertext.length % aria.ARIA_BLOCK_SIZE != 0 ){
		offset += 1;
	}
	
	let result_buffer = new ArrayBuffer(aria.ARIA_BLOCK_SIZE*offset);
  	let result = new Int8Array(result_buffer);
	
    aria.setKeySize(keyBits);
	aria.setKey(mk);
	aria.setupRoundKeys();
	
    let input_c_arr = ciphertext.split('');
	for(let i=0 ; i<offset ;i++){
		for(let k=0 ; k<16 ; k++){
			let tmp_c_arr = input_c_arr.slice(i * aria.ARIA_BLOCK_SIZE, i * aria.ARIA_BLOCK_SIZE + aria.ARIA_BLOCK_SIZE);
			c[k] = tmp_c_arr[k].charCodeAt(0);
			p[k] = 0;
		}
		
		aria.doDecrypt(c, 0, p, 0);
		
		for(let k=0 ; k<aria.ARIA_BLOCK_SIZE ; k++){
			result[i*aria.ARIA_BLOCK_SIZE + k] = p[k];
		}
//    	console.log("ciphertext : " + printBlock(c));
	}
	
	//console.log("plaintext : " + printBlock(result));
	//console.log("plaintext : " + numberToHex(result));

	return printBlock(result);
	
}

export default { encrypt, decrypt };