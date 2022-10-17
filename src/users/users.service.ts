import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import firebaseConfig from 'src/config/firebase.config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getAllPatients() {
    const snapshot = await this.firebaseService.firestore
      .collection("userDetails")
      .where("roles", "array-contains", "patient")
      .get()
    const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data().name}))
    return docs
  }

  async getPatient(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection("userDetails")
      .doc(id)
      .get()
    return snapshot.data()
  }
}


