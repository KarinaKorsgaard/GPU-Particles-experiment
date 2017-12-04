#version 120
#extension GL_ARB_texture_rectangle : enable
#define KERNEL_SIZE 9

uniform sampler2DRect backbuffer;   // recive the previus velocity texture
uniform sampler2DRect posData;      // recive the position texture
uniform vec2 a1;
uniform vec2 a2;
uniform vec2 a3;

uniform float time,timestep;
uniform float u_gravity, u_drag, u_wind;
uniform float sad, happy, focus;
uniform float sad_rand, happy_rand, focus_rand;

vec2 force(vec2 a, vec2 pos){
    
    vec2 d = (a - pos);
    float dist = length(d);
    vec2 d_norm = d/dist;
    dist = max(0.1, dist);
    
    vec2 Fgravity = d_norm / (dist*dist) ;
    
    return Fgravity;
    
}

vec2 reflect(vec2 vector, vec2 normal)
{
    return vector - dot(vector, normal) * normal;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void){
    vec2 st = gl_TexCoord[0].st;    // gets the position of the pixel that it´s dealing with...
    
    vec2 pos = texture2DRect( posData, st).xy;      // ... for gettinh the position data
    float size = texture2DRect( posData, st).z;
    vec2 vel = texture2DRect( backbuffer, st ).xy;  // and the velocity
 

    // Calculates what´s going to be the next position without updating it.
    // Just to see if it collide with the borders of the FBO texture
    //
    float freq = 1.;

    float scale1 = 80.0*sad - (sad_rand*10.*rand(vec2(time)));
    float scale2 = 80.0*happy - (happy_rand*10.*rand(vec2(time)));
    float scale3 = 80.0*focus - (focus_rand*10.*rand(vec2(time)));
    
    vec2 F_gravity = scale1 * force(a1,pos)
                   + scale2 * force(a2,pos)
                   + scale3 * force(a3,pos);
    
    /*
     vec2 F_gravity = scale1 * max(-0.1, cos(freq * time + phase1)) * force(a1,pos)
     + scale2 * max(-0.1, cos(freq * time + phase2)) * force(a2,pos)
     + scale3 * max(-0.1, cos(freq * time + phase3)) * force(a3,pos);
    */
    
    F_gravity*=0.005*u_gravity*0.2;
 
    vec2 F_wind = vec2(cos(0.5 * time), sin(0.5 * time)) * u_wind ;
    float vel_length = length(vel);
    vec2 vecNormalized = vel / vel_length;
    vec2 F_drag = - vel_length * vel_length * vecNormalized * 0.0005 * u_drag;
    vec2 F = F_drag + F_gravity + F_wind ;
    vel += F ;
    //vel = vec2(0.0);
    // vel += (1./dist1) * toMouse * 0.1 ;
    
    //vel = normalize(vel);
    vec2 nextPos = pos;
    nextPos += vel * timestep;
    
    
    // If it´s going to collide change the velocity course
    //
  
    vec2 origin = vec2(0.5,0.5);
    
    float nextPosLength = length(nextPos - origin);
    
    if(nextPosLength>0.5){
        vec2 normal = normalize(nextPos-origin);
        vel=0.5*reflect(vel,normal)-0.5*normal;
       // vel = -normal;
    }
     
//
//    
        
    gl_FragColor = vec4(vel,0.0,1.0);   // Then save the vel data into the velocity FBO
}
