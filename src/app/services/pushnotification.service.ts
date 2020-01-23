import { Injectable } from '@angular/core';
import {  
  Observable  
} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {
  public permission: Permission;
  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }
  public isSupported(): boolean {
    return 'Notification' in window;
  }
  requestPermission() {
    let self = this;
    if ('Notification' in window) {
      Notification.requestPermission(function (status) {
        return self.permission = status;
      });
    }
  }
  create(title: string, options?: PushNotification) {
    let self = this;
    return new Observable(function (obs) {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission !== 'granted') {
        console.log("The user hasn't granted you permission to send push notifications");
        obs.complete();
      }
      let _notify = new Notification(title, options);
      _notify.onshow = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onclick = function (e) {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onerror = function (e) {
        return obs.error({
          notification: _notify,
          event: e
        });
      };
      _notify.onclose = function () {
        return obs.complete();
      };
    });
  }
  generateNotification(source: Array<any>) {
    let self = this;
    source.forEach((item) => {
      let options = {
        body: item.alertContent,
        icon: "../../../assets/img/bell.png"
      };
      let notify = self.create(item.title, options).subscribe();
      this.playAudio()
    })
  }
  playAudio() {
    let audio = new Audio();
    audio.src = '../../../assets/system-fault.mp3';
    audio.load();
    audio.play();
  }
}
/**
 * 
 */
export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
} 