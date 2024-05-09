import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/api/util/cnx';
import getUserModel from '../../model/UserModel';

export async function DELETE(req: NextRequest) {
    try {
        connectToDB();

        const User = getUserModel();

        const id_User = Number(req.nextUrl.searchParams.get('id_user'));
        console.log(id_User);

        const user = await User.findOneAndDelete({ id_User });
        
        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' });
        }

        console.log('Utilisateur supprimé :', user);

        return NextResponse.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err });
    }
}